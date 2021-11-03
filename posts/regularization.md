---
layout: post
title: Regularization
tags: [Machine Learning, XCS229II]
toc: true
icon: /img/cats/data-science.svg
date: 2021-10-15 21:29:58
publish: true
description: dump
---

# Regularization

$$ \min_{\theta} \frac{1}{2} \sum_{i=1}^{m}  \\|y^{(i)}-\theta^{T}x^{(i)} \\|^2 + \underbrace{\frac{\lambda}{2} \|\theta\|^2}_{\text{regularization}} $$

## Logitic regression problem

$$ \arg \max_{\theta} \sum_{i=1}^{n} \log p \left( y^{(i)} \,|\, x^{(i)} ; \theta \right) - \lambda \|\theta\|^{2} $$

## Probabilistic interpretation of regularization

Say $S$ is the training set so that $S = \left{ x^{(i)}, y^{(i)} \right}^m_{i=1}$ and  you want to find the most likely value of $\theta$ so
$$P\left( \theta  \mid S  \right) = \frac{P\left( S  \mid \theta \right) P \left( \theta \right) }{P\left( S \right) }$$


Then
$$P\left( \theta \right): \theta \sim \mathcal{N}(0, \tau^2 \mathcal{I} ) \\
P \left( \theta \right) = \frac{1}{\sqrt{2\pi} \left( \tau^2 \mathcal{I} \right) } \exp \left( \frac{-1}{2} \theta^{T} \left( \tau^2\mathcal{I}  \right) ^{-1} \theta  \right) $$