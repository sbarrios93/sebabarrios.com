---
layout: post
title: Ridge Regression
tags: [Machine Learning]
toc: true
icon: /img/cats/data-science.svg
date: 2021-07-05
publish: true
---

## Ridge Regression

Ridge regression is a regularization method that is used to reduce overfitting. In other words, we will introduce a small amount of bias (and not fit the training data as well) but we will get a significant drop in variance. 

When Least Squares determines the values for the parameters, it seeks to minimize the sum of the squared residuals. In contrasts, when Ridge Regression determines values for the parameters, it minimizes the sum of the squared residuals + a regularization weight times $\theta ^2$.

We can assign $\lambda \, \text{or} \, \alpha$ to the regularization weight. Obviously if $\alpha  = 0$ then Ridge Regression will be minimizing the same as Least Squares, so their ending solution will be the same. As we increase $\alpha$ the slope for each $\theta$ gets asymptotically close to 0. Meaning that as $\alpha$ increases, the model becomes less sensitive to changes in the features. 

To decide which value for $\alpha$ to use, we use cross validation with different values for $\alpha$ and then we chose the one who gives us the lowest variance. 

> Note: We can still use Ridge Regression with discrete variables by using dummy variables

## Ridge Regression on Logistic Regression

We can still use Ridge Regression on models based on logistic regression, but in this case ridge regression optimizes the sum of the likelihoods instead of the squared residuals because Logistic Regression is solved using maximum likelihood. 





---
## References
https://youtu.be/Q81RR3yKn30

 Backlinks {:.backlinks-header}

 [Lasso Regression](/lasso-regression)

- Similar to [[Ridge Regression]],  but it uses a \( \ell _1 \) norm.

