---
title:          "UniDG: Unified Defect Generation via Defect-Context Editing"
date:           2026-4-10 00:01:00 +0800
selected:       true
pub:            "NeurIPS"
type:            "conference"
# pub_pre:        "Accepted at "
# pub_post:       'Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2026"

abstract: >-
  Generating realistic visual defects is crucial for alleviating the scarcity of abnormal samples in anomaly detection, yet existing methods often rely on category-specific few-shot adaptation and struggle to generalize across objects, defect types, and domains. This limitation stems in part from the lack of paired defect editing data and the fine-grained nature of defect appearance, where subtle variations in scale, texture, and morphology must be preserved while maintaining consistency with the target scene. To address this challenge, we introduce UDG, a dataset of 300K normal-abnormal-mask-caption quadruplets curated from diverse defect-related scenarios, and present UniDG, a unified defect generation model. UniDG formulates defect synthesis as Defect-Context Editing: it extracts reference defect context with adaptive cropping, organizes reference and target inputs in a structured diptych format, and fuses multimodal conditions through MM-DiT attention. We further develop a two-stage training strategy: Diversity-SFT learns diverse transferable defect priors from paired editing data, while optional Consistency-RFT can further improve reference adherence, local realism, and defect-category consistency. Without per-category fine-tuning or using MVTec-AD/VisA for training, UniDG outperforms prior few-shot anomaly generation and image insertion/editing baselines in both synthesis quality and downstream single- and multi-class anomaly detection/localization.
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
