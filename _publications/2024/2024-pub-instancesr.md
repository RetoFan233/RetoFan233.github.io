---
title:          "InstanceSR: Efficient Reconstructing Small Object with Differential Instance-level Super-Resolution"
date:           2024-12-12 00:01:00 +0800
selected:       true
pub:            "IEEE TCSVT2024"
# pub_pre:        "Submitted to "
# pub_post:       'Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2024"

abstract: >-
  Super-resolution (SR) aims to restore a high-resolution (HR) image from its low-resolution (LR) counterpart. Existing works try to achieve an overall average recovery over all regions to provide better visual quality for human viewing. If we desire to explore the potential that performs super-resolution for machine recognition instead of human viewing, the solution should change accordingly. From this insight, we propose a new SR pipeline, called InstanceSR, which treats each region in the LR image differentially and consumes more resources to focus on the recovery of the foreground region where the instances exist. In particular, InstanceSR consists of an encoder that formulates the LR image into a set of various difficulty tokens according to the instances distribution in each sub-region, and a decoder based on a multi-exit network structure to recover the sub-regions corresponding to various difficulty tokens by consuming different computational resources. Experimental results demonstrate the superiority of the proposed InstanceSR over state-of-the-art models, especially the recovery of regions where instances exist, by extensive quantitative and qualitative evaluations on three widely used benchmarks containing small instances. Besides, the comparisons using SR results on three challenging small object detection benchmarks verify that our InstanceSR can consistently boost the detection accuracy and has great potential for subsequent machine recognition.
cover:          assets/images/covers/Overview_tcsvt_major.png
authors:
  - Yuanting Fan
  - Chengxu Liu
  - Ruhao Tian
  - Xueming Qian
links:
  # Code: https://github.com/luost26/academic-homepage
  # Unsplash: https://unsplash.com/photos/sliced-in-half-pineapple--_PLJZmHZzk
  Paper: https://ieeexplore.ieee.org/abstract/document/10750855
---
