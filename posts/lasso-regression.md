---
layout: post
title: Lasso Regression
tags: [Machine Learning]
toc: true
icon: /img/cats/data-science.svg
date: 2021-07-05
publish: true
description: dump
---

## Lasso Regression
Form of regularization for Linear Regression

Similar to [Ridge Regression](/ridge-regression),  but it uses a $\ell _1$ norm.

Equal to Ridge Regression, Lasso will result with a little more bias but with less variance than simple least squares.

The important difference between Ridge Regression and Lasso Regression is that while Ridge Regression can only shrink the slope asymptotically close to 0 while Lasso Regression can shrink the slope all the way to 0.

In this sense, Lasso Regression can exclude useless variables from equations, leaving only the important features. In contrast, Ridge Regression tends to be a little better when most variables are useful.

![](/img/post/lasso-regression/Statquest-image-lasso-regression.png )
## Related Notes
[Ridge Regression v. Lasso Regression](/ridge-regression-v-lasso-regression)
## References
https://www.youtube.com/watch?v=NGf0voTMlcs