---
layout: post
title: Git Commands
tags: [Git]
toc: true
icon: /img/cats/data-science.svg
date: 2021-07-05
publish: True
---

## Git Commands

## Branches
### Creating new Branch
Before creating a new branch, pull the changes from upstream

```bash
git pull
```

Create branch locally and switch to it

```bash
git checkout -b [new_branch_name]
```

You could also do

```bash
git branch [new_branch_name]
git checkout [new_branch_name]
```