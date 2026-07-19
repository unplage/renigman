# 变异检测的 GATK 最佳实践解析

GATK（Genome Analysis Toolkit）是 Broad Institute 开发的基因组分析工具包，其 Best Practices 流程已成为全基因组/全外显子组测序数据分析的金标准。

## GATK HaplotypeCaller 原理

HaplotypeCaller 是 GATK 的核心变异检测工具，其算法包含以下关键步骤：

1. **局部重比对**：在变异富集区域进行局部 de novo 组装
2. **单倍体推断**：通过 De Bruijn 图构建可能的单倍型
3. **概率模型**：使用隐马尔可夫模型进行基因型赋值
4. **VQSR 过滤**：基于高斯混合模型的分层质量过滤

## BQSR 流程设计

Base Quality Score Recalibration（BQSR）是变异检测准确性的关键保障：

```bash
# Step 1: 建立协变量模型
gatk BaseRecalibrator \
    -I aligned_reads.bam \
    -R reference.fa \
    --known-sites dbsnp.vcf.gz \
    --known-sites mills_indels.vcf.gz \
    -O recal_data.table

# Step 2: 应用 BQSR
gatk ApplyBQSR \
    -I aligned_reads.bam \
    -R reference.fa \
    --bqsr-recal-file recal_data.table \
    -O recalibrated.bam
```

## HaplotypeCaller 变体检测

```bash
gatk HaplotypeCaller \
    -R reference.fa \
    -I recalibrated.bam \
    -O raw_variants.vcf.gz \
    -ERC GVCF \
    --max-reads-per-alignment-start 0
```

## VQSR 质量过滤

VQSR（Variant Quality Score Recalibration）利用已知变异位点作为训练集，对检测到的变异进行质量评分：

```bash
# SNP 过滤模型
gatk VariantRecalibrator \
    -V raw_snps.vcf.gz \
    --resource:hapmap,known=false,training=true,truth=true,prior=15.0 hapmap_3.3.hg38.sites.vcf.gz \
    --resource:omni,known=false,training=true,truth=true,prior=12.0 1000G_omni2.5.hg38.sites.vcf.gz \
    --resource:dbsnp,known=true,training=false,truth=false,prior=6.0 dbsnp_146.hg38.vcf.gz \
    -an QD -an MQ -an MQRankSum -an ReadPosRankSum -an FS -an SOR \
    -mode SNP \
    -O snp.recal \
    --tranches-file snp.tranches
```

## 常见错误排查

### 错误 1：内存不足

**症状**：Java OutOfMemoryError
**解决**：增加 JVM 堆内存

```bash
gatk --java-options "-Xmx32g" HaplotypeCaller ...
```

### 错误 2：参考基因组版本不匹配

**症状**：Fasta 索引不匹配错误
**解决**：确保参考基因组的 `.dict` 和 `.fai` 索引文件与 fasta 版本一致

```bash
# 创建索引
samtools faidx reference.fa
gatk CreateSequenceDictionary -R reference.fa
```

### 错误 3：BAM 文件问题

**常见问题**：RG tag 缺失、排序顺序不一致、重复标记未完成
**解决**：

```bash
# 添加 RG tag
gatk AddOrReplaceReadGroups \
    -I unsorted.bam \
    -O sorted.bam \
    -RGID sample1 \
    -RGSM sample1 \
    -RGLB library1 \
    -RGPL ILLUMINA \
    -RGPU unit1

# 排序并标记重复
gatk SortSam -I sorted.bam -O coordinate_sorted.bam
gatk MarkDuplicates -I coordinate_sorted.bam -O dedup.bam
```

## 性能优化建议

1. **并行化**：使用 `-L` 参数分割基因组进行并行处理
2. **间隔列表**：只分析目标区域可大幅降低计算资源
3. **SSD 存储**：I/O 密集型操作强烈建议使用 SSD
4. **适度线程**：`--native-pair-hmm-threads` 控制在 4-8 个为宜

## 总结

GATK Best Practices 经过多年的社区验证，已成为变异检测的标准流程。理解其底层算法的原理，对于排查分析中的问题、优化流程性能至关重要。随着长读长测序技术的发展，GATK 团队也在持续更新支持 PacBio HiFi 和 ONT 数据的分析模块。
