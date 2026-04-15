---
title:          "Large-Scale Universal Defect Generation: Foundation Models and Datasets"
date:           2026-4-10 00:01:00 +0800
selected:       true
pub:            "arXiv"
pub_pre:        "Preprint, "
# pub_post:       'Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2026"

abstract: >-
  Existing defect/anomaly generation methods often rely on few-shot learning, which overfits to specific defect categories due to the lack of large-scale paired defect editing data. This issue is aggravated by substantial variations in defect scale and morphology, resulting in limited generalization, degraded realism, and category consistency. We address these challenges by introducing UDG, a large-scale dataset of 300K normal-abnormal-mask-caption quadruplets spanning diverse domains, and by presenting UniDG, a universal defect generation foundation model that supports both reference-based defect generation and text instruction-based defect editing without per-category fine-tuning. UniDG performs Defect-Context Editing via adaptive defect cropping and structured diptych input format, and fuses reference and target conditions through MM-DiT multimodal attention. A two-stage training strategy, Diversity-SFT followed by Consistency-RFT, further improves diversity while enhancing realism and reference consistency. Extensive experiments on MVTec-AD and VisA show that UniDG outperforms prior few-shot anomaly generation and image insertion/editing baselines in synthesis quality and downstream single- and multi-class anomaly detection/localization.
cover:          assets/images/covers/overview_unidg.png
authors:
  - Yuanting Fan
  - Jun Liu
  - Bin-Bin Gao
  - Xiaochen Chen
  - Yuhuan Lin
  - Zhewei Dai
  - Jiawei Zhan
  - Chengjie Wang
links:
  Paper (arXiv): https://arxiv.org/abs/2604.08915
  Code: https://github.com/RetoFan233/UniDG
---
