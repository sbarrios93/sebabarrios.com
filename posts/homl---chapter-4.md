---
layout: post
title: Chapter 4 - Linear Regression Models
tags: [Hands on Machine Learning]
toc: true
icon: /img/cats/data-science.svg
date: 2021-07-05
publish: true
---

This chapter focuses on **Linear Regression Models**.

There's basically two ways to train a linear regression model:

1. **Closed-form equation**: directly computes the model parameters that best fit the model to the training set.
2. **Iterative**: iterative optimization called **Gradient Descent** that gradually tweaks the model parameters to minimize a cost function. We can break down Gradient Descent in: Batch GD, Stochastic GD and Minibatch GD.

## 1.1. Linear Regression

Linear models predict a target variable by computing the weighted sum of the input features (this could be a input vector $\textbf{x}$) plus a constant called the *bias term* (or *intercept term*).

$$\hat{y} = \theta_0 + \theta_1 \cdot x_1 + \theta_2 \cdot x_2 + \cdots + \theta_n \cdot x_n$$

In vectorized form:

$$\hat{y} = h_ \mathbf{\theta } \left( \mathbf{x} \right)  = \mathbf{\theta } \cdot \mathbf{x}$$

To train the model, we look for the value of $\theta$ that minimizes the RMSE. But in practice we seek to minimize the MSE, because it it simpler and the value that minimizes a function $f(x)$ also minimizes the function $\sqrt[]{f(x)}$.

Now, recall that the MSE is equal to

$$MSE \left( \mathbf{X}, h_\theta    \right)  = \frac{1}{m_i} \sum_{i=1}^{m} \left( \mathbf{\theta }^T x^{(i)}  - y^{(i)} \right)  ^ 2$$

### 1.1.1. The normal equation

For the linear regression there is a closed form solution to minimize the cost function, called the normal equation.

The values of $\theta$ that minimize the cost function is given by:

$$\hat{\mathbf{\theta} } = \left( \mathbf{X}^T \mathbf{X}  \right) ^ {-1} \mathbf{X}^T \mathbf{y}$$

> **A note on computational complexity**
> The normal equation computes the inverse of $\mathbf{X}^T \mathbf{X}$ which is an (n + 1) x (n + 1) matrix. The computational complexity of inverting a matrix like that is roughly $\mathcal{O} \left( n^{2.3} \right) \text{to}\,  \mathcal{O} \left( n^3 \right)$. In other words, by doubling the number of features, the computation time increases to 5.3 to 8 times.

## 1.2. Gradient Descent

Iterative process that tweaks the parameters to minimize the cost function. Gradient Descent works by measuring the local gradient of the error function and it follows the direction of the descending gradient. The process ends when it reaches a minimum.

Before the first step, the vector $\vec{\theta }$ is randomly initialized (i.e. filled with random values).

![Gradient Descent Representation](/img/post/homl---chapter-4/gradient-descent-1.png )
A simple representation of Gradient Descent

One important part of Gradient Descent is the size of each step (each iteration) - this is determined by the **learning rate** hyperparameter. If the learning rate is too small, the algorithm will take too many iterations to converge. If the learning rate is too high, the algorithm might jump all over the place, and may even go to points with a higher cost than you were before. This will possibly make the algorithm to diverge.

It is important to note that not necessarily Gradient Descent will find the global minimum, it could very well be that it only converges to the local minimum.

Fortunately, the MSE is a convex function, so we know that it will only have one minimum: the global minimum.

To implement Gradient Descent, we need to compute the gradient of the cost function with respect to each model parameter $\theta _j$.
The partial derivative w.r.t $\theta _j$ is

$$\frac{\partial }{\partial \theta _j} MSE \left( \mathbf{\theta } \right) = \frac{2}{m}   \sum_{i=1}^{m} \left( \mathbf{\theta} ^T \mathbf{x} ^{(i)} - y ^{(i)} \right) x_j^{(i)}$$
### 1.2.1. Batch Gradient Descent

Batch Gradient Descent will calculate at each step the gradients for all the parameters and for all the training set. This makes it terribly slow for very large datasets, but it actually performs better than other algorithms when there are a large number of feature.

The full gradient vector of the cost function will be:

$$\nabla _\theta MSE \left( \theta  \right) =
    \begin{bmatrix}
    \frac{\partial }{\partial \theta_0 } MSE \left( \theta  \right) \\
    \frac{\partial }{\partial \theta_1 } MSE \left( \theta  \right) \\
    \frac{\partial }{\partial \theta_2 } MSE \left( \theta  \right) \\
    \vdots \\
    \frac{\partial }{\partial \theta_n } MSE \left( \theta  \right) \\
\end{bmatrix}$$

Now, keep in mind that the gradient vector points uphill, so we actually subtract this from $\theta$ to take the next step.

Let $\eta$ be the learning rate, then

$$\theta^{(\text{next step})} = \mathbf{\theta } - \eta \nabla _ \theta MSE \left( \theta  \right)$$

### 1.2.2. Stochastic Gradient Descent

Stochastic Gradient Descent differs from Batch Gradient Descent in that it picks a single instance of the training set at every step and computes the gradient based only on that single instance.

Working on a single instance at a time, it it much faster than BGD. While using less memory (it only needs to hold a single training example in memory), it is a good algorithm if one needs to train on a huge data set.

Now, because it is stochastic, the algorithm is much less regular than Batch Gradient Descent. It will decrease and get close to the minimum, but it will continue hovering around it. This algorithm will most likely never reach the optimum, as Batch Gradient Descent will.

An advantage of SGD is that it has a better chance than Batch Gradient Descent of getting out of a local minimum (and finding the global minimum) because the path that follows Stochastic Gradient Descent is much more irregular.


A way to fix the issue of hovering around the minimum is to use what is called a **learning schedule**

With a learning schedule, we reduce the learning rate after each iteration. We start out with a large training rate (to get better odds of escaping local minima) and then reduce the training rate to allow the algorithm to settle at the global minimum.

### 1.2.3. Mini-batch Gradient Descent

Mini-batch gradient descent is a combination of SGD and BGD. It computes the gradientes in subsets of the training set called mini batches. Because it uses more examples per iteration than SGD it is les erratic on its path toward optimum, but it also has less chance of "jumping out" of a local minima than Stochastic Gradient Descent.

## 1.3. Polynomial Regression

Polynomial regression is used to answer the question of what happens if the data is more complex than a straight line.

In this case, we add powers to each feature as new features, and then we train the model including these extended features.

Now, the degree of the polynomial $k$ will be the one that that fits the data better. With a low value of $k$, odds are we will underfit the data, and with a large $k$ we run the risk of overfitting.

It is useful to note that when there are multiple features, the polynomial regression is capable of finding relationships between features that the Linear Regression can't.

> **The Bias/Variance trade-off.**
> We can express a model's generalization error as the sum of three different errors.
>
> 1. Bias: Due to wrong assumptions (e.g. assuming the data is linear when it is actually quadratic). **A high bias model is most likely to underfit the training data**
> 2. Variance: Due to a model's excessive sensitivity to small variations in the training data. This is common in models with many degrees of freedom, inducing the algorithm to overfit the training data.
> 3. Irreducible error: Due to noisiness of the data. The way to reduce this error is to clean up the data.

## 1.4. Regularized Linear Models.

A common way to reduce overfitting is to regularize the data (i.e. to constrain it). This can be done simply by reducing the number of polynomial degrees.

### 1.4.1. Ridge Regression

Ridge regression is a form of regularized Linear regression, where a regularization term is added to the cost function, where the regularization term is
$$\alpha \sum_{i=1}^{n} \theta _i ^ {2}$$

By adding this term we force the algorithm to keep the weights as small as possible while fitting the data.

**Note that the regularization term should be added only during training, it should be used on evaluating the predictions on the validation/test set**

So the ridge regression cost function for the training step will be:
$$J(\theta ) = MSE(\theta) + \alpha \frac{1}{2} \sum_{i=1}^{n}\theta _i ^ 2$$ 
**Note that $\theta_0$ is not regularized**.

It is important to note that if we let $\mathbf{w}$ be the vector of the weights $(\theta _1...\theta _n)$ then the regularization term will be equal to $\frac{1}{2} \left(\left\| w \right\|_2\right)^2$, where $\left\| w \right\| _2$ represents the $\ell _2$ norm of the weight vector. 

#### 1.4.1.1. The Closed Form Solution
Let $\mathbf{A}$ be the identity matrix of shape $\left( n + 1 \right) \times \left( n + 1 \right)$, with the slight modification of having a 0 in the top-left cell (which is the bias term), then the closed-form solution for the Ridge Regression is:

$$\hat{\theta } = \left( X^TX + \alpha \mathbf{A} \right) ^ {-1} X^T \mathbf{y}$$

### 1.4.2. Lasso Regression

THis is another regularized version of Linear Regression. In this case, the regularization therm uses the $\ell_1$ norm of the weight vector instead of the $\ell_2$

The cost function will be

$$J \left( \theta  \right) = MSE \left( \theta  \right) + \alpha \sum_{i=1}^{n} \mid \theta _1 \mid$$ 
Now, the Lasso Regression tendos to eliminate weights of the least important features (setting their $\theta$ to 0 ). In other words, Lasso Regression automatically performs feature selection and outputs a *sparse model*.

We need to be careful because the Lasso cost function is not diffrentiable at $\theta_i  = 0 \, \forall i$. To make Gradient Descent work, we will need a subgradient vector $\mathbf{g}$ when $\theta_i = 0$. 

Then:
$$g \left( \theta , J \right) = \nabla _\theta  MSE \left(  \theta  \right) + \alpha 
      \begin{pmatrix} 
      s(\theta_1) \\
      s(\theta_2) \\
      \vdots \\
      s(\theta_n)                       
      \end{pmatrix} \text{where } s(\theta_i)  = \begin{cases}
      -1 &\text{if } \theta_i < 0\\
      0  &\text{if } \theta_i = 0\\
      1 &\text{if } \theta_i > 0
      \end{cases}$$

### 1.4.3. Elastic Net
This is a combination of using Ridge Regression and Lasso Regression. Where the mix is controlled by the mix ratio $r$. When $r = 0$ then Elastic Net is the same as Ridge Regression and when $r = 1$ it is equal to Lasso Regression.

$$J(\theta ) = MSE (\theta) + r \alpha \sum_{i = 1}^{n } \mid \theta _i \mid + \frac{1-r}{2} \alpha \sum_{i=1}^{n} \theta ^ 2 _ i$$ 

### 1.4.4. When to use what

Ridge is a good default, but if you suspect that some features are not useful, Elastic Net or Lasso Regression may be better. In general Elastic Net is preferred over Lasso because Lasso may behave erratically when the number of features is greater than the number of training instances or when several features may be strongly correlated.

### Early Stopping

This is a different way of regularizing an algorithm, in which we stop the training as soon as the **validation** error reaches a minimum. 
As the epochs go by, and the prediction error goes down, the prediction on the validation set should go down as well. 

This is only up to a point. After a while, the validation error may stop decreasing and start going up. This would mean that **the training model has start to overfit the data**. 

With early stopping we just stop training as soon as the validation error reaches the minimum. 

> With Stochastic and Mini-batch the curves will not be smooth, so it may be hard to know whether we have reached the minimum or not. One solution is to stop only after the validation error has been above the minimum for some time, then roll back the model parameters to the point where the validation error was at a minimum. 

## Logistic Regression

Some models can be used for classification as well as regression. One of the most common ones is Logistic Regression, which is used to estimate the probability that an instance belongs to a particular class. 

If the probability is greater than 50%, then the model predicts that the instance belongs to that class. Otherwise it doesn't belong to that class. 

More formally: 

Let $k$ be the classes where $k = \left\{ 0,1 \right\}$ meaning that if $k = 1$ then it belongs to the class and if $k = 0$ then it doesn't belong to the class. Then:
      $$\hat{k} = 1 \iff p(k = 1) \geq 0.5$$ 

The class $k = 1$ is also known as the positive class and the class $k = 0$ is known as the negative class. 

### Probabilities

A Logistic Regression computes a weighted sum of the input features as seen previously (i.e. $\theta^T  \mathbf{x}$ ) but it outputs the logistic of the linear function. 

The equation is:
$$\hat{p} = h_\theta ( \mathbf{x}) = \sigma \left(  \theta^T\mathbf{x} \right)$$ where $\sigma \left( \cdot \right)$ is the sigmoid function. 

Then the full logistic function is

 $$h _ \theta (x) = \sigma(\theta^T x) = \frac{1}{1 + \exp (- \theta ^T x)}$$ 

### Training and Cost Function

The objective is to set the parameter vector $\theta$ so that the model estimates high probabilities for a positive instance and low probability for a negative instance. 

Then the cost function for a single training instance would be soemthing like this
$$c \left( \theta  \right) = \begin{cases}
-\log{\hat{p}}   &\text{if } y = 1 \\
-\log{(1-\hat{p})} &\text{if } y = 0\\
\end{cases}$$

Which makes sense because $- \log (x)$ grows very large when $x$ approaches 0, so the cost function will be large if the model estimates a probability close to 0 for a positive instance, and it will be very large if the model estimates a probability close to 1 for a negative instance. 

Then the cost function will be, which is called the *log-loss*

$$J (\theta) = - \frac{1}{m } \sum_{i=1}^{m }\left[ y ^{(i)} \log \left( \hat{p}^{(i)} \right) + \left( 1 - y^{(i)} \right)\log \left( 1 - \hat{p}^{(i)}    \right)   \right]$$ 
We know that the cost function is convex, so Gradient Descent is guaranteed to find the global minimum. 

The partial derivatives are the following:

$$\frac{\partial }{\partial {\theta_j}} J \left( \theta  \right) = \frac{1}{m } \sum_{i=1}^{m } \left( \sigma \left( \theta^T x ^ {(i)} \right) - y ^{(i)}  \right) x_j$$ 

## Softmax Regression

The logistic regression can be generalized to support multiple classes directly, without having to train and combine multiple binary classifiers. 

When given an instance $\mathbf{x}$, the softmax regression model first computes a score $s_k(\mathbf{x })$ for each class $k$, then estimates the probability for each class by applying the softmax function to the scores. 

First, the softmax score will be

$$s_k \left( \mathbf{x } \right) = (\theta^T_k) \mathbf{x}$$ 

**Note that each class has its own dedicated parameter vector $\theta _k$** 

Then we can estimate the probability $\hat{p }_k$ that the instance belongs to class $k$ by running the scores through the softmax function. 

The softmax function computes the exponential of every score, then normalizes them so they sum to 1.

The softmax function is

$$\hat{p_k} = \sigma \left( s(x) \right)_k = \frac{\exp \left( s_k (x) \right) }{\sum_{j=1}^{k } \exp (s_j(x))}$$ 

Here $K$ is the number of classes, while $s(x)$ is a vector containing the scores of each class for the instance $x$. Finally, $\sigma \left( s \left( x  \right)  \right)$ is the estimated probability that the instance $x$ belongs to class k, given the scores of each class for that instance. 

The Softmax Regression classifier predicts the class with the highest estimated probability.

The Classifier Prediction will be

$$\hat{y } = \arg \max_{k } \sigma \left( s \left( x  \right)  \right)_k = \arg \max_{k }  s_k \left( x  \right) = \arg \max_{k } \left( \theta ^T _k x   \right)$$
 > The softmax regressionis multiclass, not multioutput. Meaning that it predicts only one class at a time, so the classes should be **mutually exclusive**.
 
 The objective is to have a model that estimates a high probability for the target class. Minimizing the cost function (called **cross entropy**) we should be able to optimize for the parameters that achieve this goal. 

 **Cross entropy is frequently used to measure how well a set of estimated class probabilities matches the target classes**
 
 The cross entropy cost function will be

 $$J \left( \theta  \right) = - \frac{1}{m } \sum_{i=1}^{m} \sum_{k=1}^{K } y^{(i)}_k \log \left( \hat{p }_k^{(i)} \right)$$ 
        Where $y_k^{(i)}$  is the target probability that the $\imath ^{th}$ instance belongs to class $k$.

The gradient vector of the cost function with regards to $\theta_k$ will be:

$$\nabla _ {\theta_k} J (\Theta) = \frac{1}{m } \sum_{i=1}^{m }\left( \hat{p }_k ^{(i)} - y^{(i)}_k \right) x^{(i)}$$