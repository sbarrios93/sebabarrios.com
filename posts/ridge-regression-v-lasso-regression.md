---
layout: post
title: Ridge Regression versus Lasso Regression
tags: [Machine Learning]
toc: true
icon: /img/cats/data-science.svg
date: 2021-07-05
publish: true
---

# Ridge Regression v. Lasso Regression
## A visual representation

This is the common parabola for a least square regression cost function.

![](/img/post/ridge-regression-v-lasso-regression/statquest-ridge-v-lasso-1.png )

When we use Ridge Regression, we can see that when we increase the regularization weight, the parabola shifts up and left, and the optimal value of $\theta$  gets closer to 0 (but it never touches it).

![](/img/post/ridge-regression-v-lasso-regression/statquest-ridge-v-lasso-2.png )

In contrast, with Lasso regression, as we increase the regularization weight, the curves show a kink at the value 0, and at same point the optimal value become 0

![](/img/post/ridge-regression-v-lasso-regression/statquest-ridge-v-lasso-3.png )

 Backlinks {:.backlinks-header}

 [Lasso Regression](/lasso-regression)

- [[Ridge Regression v. Lasso Regression]]

