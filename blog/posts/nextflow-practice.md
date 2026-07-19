# Nextflow 实战：构建可复用的生信分析流程

Nextflow 是一个强大的工作流管理系统，广泛应用于生物信息学。本文从实战角度出发，介绍如何使用 Nextflow 构建可复用的生信分析流程。

## 为什么选择 Nextflow

- **可移植性**：支持各种执行平台（本地、HPC、云）
- **容器化原生支持**：天然集成 Docker/Singularity
- **DSL2 模块化**：流程复用与组合
- **断点续跑**：避免重复计算

## 环境配置

```bash
# 安装 Nextflow
curl -s https://get.nextflow.io | bash
mv nextflow ~/bin/

# 验证安装
nextflow info
```

## DSL2 模块化设计

DSL2 是 Nextflow 的核心范式，通过模块化设计实现流程复用：

```nextflow
// modules/rnaseq.nf
process STAR_ALIGN {
    container 'quay.io/biocontainers/star:2.7.10a'

    input:
    tuple val(sample_id), path(read1), path(read2)
    path(genome_index)

    output:
    tuple val(sample_id), path("${sample_id}.bam")

    script:
    """
    STAR --runThreads $task.cpus \\
         --genomeDir $genome_index \\
         --readFilesIn $read1 $read2 \\
         --outFileNamePrefix ${sample_id}_
    """
}
```

## 流程组装

```nextflow
// main.nf
nextflow.enable.dsl = 2

include { STAR_ALIGN } from './modules/rnaseq.nf'

workflow {
    RNASEQ_PIPELINE {
        ch_raw_data | STAR_ALIGN(genome_index) | view
    }
}
```

## 容器化最佳实践

### 使用 Docker

```bash
# 构建容器
docker build -t bio-pipeline:1.0 .

# 在 Nextflow 中使用
nextflow run main.nf -with-docker bio-pipeline:1.0
```

### 配置 Singularity（HPC 场景）

```nextflow
// nextflow.config
singularity {
    enabled = true
    cacheDir = '/path/to/singularity/cache'
}

process.container = {
    "shub://biocontainers/star:2.7.10a--h9ee0642_0"
}
```

## CI/CD 集成

使用 GitHub Actions 自动测试流程：

```yaml
name: Test Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: nf-core/setup-nextflow@v1
      - run: nextflow run main.nf -profile test
```

## 调试与日志

```bash
# 启用详细日志
nextflow run main.nf -log debug.log

# 使用 trace 追踪资源使用
nextflow run main.nf -with-trace

# 使用 report 生成 HTML 报告
nextflow run main.nf -with-report
```

## 总结

Nextflow DSL2 的模块化设计使得生信流程的开发和维护变得简单高效。结合容器化和 CI/CD，可以构建真正可复用的生产级分析流程。
