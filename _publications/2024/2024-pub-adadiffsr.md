---
title:          "AdaDiffSR: Adaptive Region-aware Dynamic Acceleration Diffusion Model for Real-World Image Super-Resolution"
date:           2024-7-12 00:01:00 +0800
selected:       true
pub:            "ECCV2024"
# pub_pre:        "Submitted to "
# pub_post:       'Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2024"

abstract: >-
  Diffusion models (DMs) have shown promising results on single-image super-resolution and other image-to-image translation tasks. Benefiting from more computational resources and longer inference times, they are able to yield more realistic imagesqueryThis is to inform you that corresponding author has been identified as per the information available in the Copyright form.. Existing DMs-based super-resolution methods try to achieve an overall average recovery over all regions via iterative refinement, ignoring the consideration that different input image regions require different timesteps to reconstruct. In this work, we notice that previous DMs-based super-resolution methods suffer from wasting computational resources to reconstruct invisible details. To further improve the utilization of computational resources, we propose AdaDiffSR, a DMs-based SR pipeline with dynamic timesteps sampling strategy (DTSS). Specifically, by introducing the multi-metrics latent entropy module (MMLE), we can achieve dynamic perception of the latent spatial information gain during the denoising process, thereby guiding the dynamic selection of the timesteps. In addition, we adopt a progressive feature injection module (PFJ), which dynamically injects the original image features into the denoising process based on the current information gain, so as to generate images with both fidelity and realism. Experiments show that our AdaDiffSR achieves comparable performance over current state-of-the-art DMs-based SR methods while consuming less computational resources and inference time on both synthetic and real-world datasets.
cover:          assets/images/covers/overview_eccv_v3.png
authors:
  - Yuanting Fan
  - Chengxu Liu
  - Nengzhong Yin
  - Changlong Gao
  - Xueming Qian
links:
  # Code: https://github.com/luost26/academic-homepage
  # Unsplash: https://unsplash.com/photos/sliced-in-half-pineapple--_PLJZmHZzk
  Paper: https://link.springer.com/chapter/10.1007/978-3-031-73254-6_23
---
