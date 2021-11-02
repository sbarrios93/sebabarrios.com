---
layout: post
title: Percy - Troubleshooting and Tips
tags: ['Uncategorized']
toc: true
icon: /img/cats/data-science.svg
date: 2021-07-07
publish: true
---

## nvargus-daemon is not running
```bash
sudo systemctl restart nvargus-daemon
```
## Ubuntu
### Update
```bash
sudo apt-get update
```

## Terminal
### Multiple terminal windows for same SSH Connection
1. Install Screen
    ```bash
    sudo apt-get install screen
    ```
2. New Screen
    ```bash
    screen 
    ```
3. Detach Screen
    ```
    CTRL + A + D
    ```
4. Show Screen Sessions
    ```bash
    screen -ls
    >>>There are screens on:
    >>>119217.pts-3.webhosting1200 (Detached)
    >>>344074.pts-13.webhosting1200 (Detached)
    >>>825035.pts-1.webhosting1200 (Detached)
    ```
5. Attach to a Screen
    ```bash
    screen -r 344074
    ```
6. Quit a screen
    ```
    CTRL + A, K
    ```
7. Kill a complete session
    ```bash
    screen -X -S [session number you want to kill] quit
    ```