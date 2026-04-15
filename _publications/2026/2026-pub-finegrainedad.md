---
title:          "Towards Fine-Grained Vision-Language Alignment for Few-Shot Anomaly Detection"
date:           2026-2-27 00:01:00 +0800
selected:       true
pub:            "Pattern Recognition"
# pub_pre:        "Submitted to "
# pub_post:       'Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2026"

abstract: >-
  Few-shot anomaly detection (FSAD) methods identify anomalous regions with few known normal samples. Most existing methods rely on the generalization ability of pre-trained vision-language models (VLMs) to recognize potentially anomalous regions through feature similarity between text descriptions and images. However, due to the lack of detailed textual descriptions, these methods can only pre-define image-level descriptions to match each visual patch token to identify potential anomalous regions, which leads to the semantic misalignment between image descriptions and patch-level visual anomalies, achieving sub-optimal localization performance. To address the above issues, we propose the Multi-Level Fine-Grained Semantic Caption (MFSC) to provide multi-level and fine-grained textual descriptions for existing anomaly detection datasets with automatic construction pipeline. Based on the MFSC, we propose a novel framework named FineGrainedAD to improve anomaly localization performance, which consists of two components: Multi-Level Learnable Prompt (MLLP) and Multi-Level Semantic Alignment (MLSA). MLLP introduces fine-grained semantics into multi-level learnable prompts through automatic replacement and concatenation mechanism, while MLSA designs region aggregation strategy and multi-level alignment training to facilitate learnable prompts better align with corresponding visual regions. Experiments demonstrate that the proposed FineGrainedAD achieves superior overall performance in few-shot settings on MVTec-AD and VisA datasets.
cover:          assets/images/covers/overview_pr_fgad.png
authors:
  - Yuanting Fan
  - Jun Liu
  - Xiaochen Chen
  - Bin-Bin Gao
  - Jian Li
  - Yong Liu
  - Jinlong Peng
  - Chengjie Wang
links:
  Paper (Elsevier): https://doi.org/10.1016/j.patcog.2026.113316
  Paper (arXiv): https://arxiv.org/pdf/2510.26464
  Code: https://github.com/RetoFan233/FineGrainedAD
---
