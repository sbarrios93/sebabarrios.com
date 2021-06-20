---
layout: post
title: "Gitkraken"
tags: [Skills, Git]
toc: true
icon: "/img/header/gitkraken.svg"
keywords: "git github private account ssh different profiles git client token ideta generate"
---

## Check history of a file

[[Ctrl]] + [[P]] > Type "History" > Enter the file path.

## Connect to a private account?

1. Sign in with any account in GK.
2. Add new profile (with private acc)
3. Click on **Integrations** $\Rightarrow$ Connect to private account & Generate a new SSH token.
4. Refresh things to see the changes.

## Different profiles?

Suppose that we work with `dinhanhthi@gmail.com` (personal) and `thi@ideta.io` (work). There are personal repos and working repos.

1. Sign in to GK with any profile (suppose personal).
2. Make 2 different profiles (one for personal, one for working).
3. Connect to Github account in each profile (need to approve + generate a new SSH key for each)
4. Each profile will have a separated workspace.
5. Everytime choosing a profile, a new workspace with its repos will be loaded.

**If problems?** In case you cannot integrate automatically to different Github accounts in the same session of Gitkraken.

1. Keep integrate auto for 1 account.
2. [Create](/ssh/) a seprate SSH keys.
3. In the **Integrations** tab, link to the files created in previous step.
4. Clone projects by ssh url instead.

## References

- [Gitkraken cheat sheet](https://www.gitkraken.com/downloads/gitkraken-git-gui-cheat-sheet.pdf).