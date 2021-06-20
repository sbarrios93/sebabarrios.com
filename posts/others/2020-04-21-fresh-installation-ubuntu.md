---
layout: post
title: "Fresh Ubuntu / Pop!_OS Installation"
tags: [Others, Fresh Installation, Linux, Collection]
toc: true
icon: ubuntu.svg
keywords: "to do list after installing ubuntu debian elementary os linux airpod bluetooth capture screen screen recorder guake xps k380 keyboard logitech pop os popos"
---

The basic steps I often do every time I install a new Ubuntu system. The order of things is important.

👉 Note: [Linux](/linux-tips/)
👉 Note: [Windows fresh start](/fresh-install-windows/)
👉 Note: [Mac fresh start](/fresh-install-macos/)
👉 Note: [Bash](/bash-command-line/)

:::info
Most of commands are for both Ubuntu and Pop!\_OS, there are some which are only for Pop!\_OS.
:::

::: warning
**For Pop!\_OS**: You don't need to do everything in below steps.
:::

{:.noindent}

1. Download [Ubuntu ISO](https://ubuntu.com/download/desktop). If you like a MacOS-like version, you can choose [Elementary OS](https://elementary.io/).
2. Using [Rufus](https://rufus.ie/) (on Windows) or [Etcher](https://www.balena.io/etcher/) (on any system, **recommended**) or [popsicle](https://github.com/pop-os/popsicle) (usb flasher, on pop!\_os) to create a bootable USB drives.
3. **[Pop!\_OS]** Download [Pop!\_OS](https://pop.system76.com/) (with NVIDIA)
   1. (**Update 05 Jun 2021** - **IMPORTANT**) If you're using DisplayLink Dock (more than 1 external screens, Pop!\_OS doesn't work with the DisplayLink Driver 5.4 but it works for Ubuntu 20.04). So, you have no choice to **use Ubuntu instead of Pop!\_OS**!!!! [Read more](https://www.reddit.com/r/pop_os/comments/mok7mf/fresh_pop_os_install_installed_displaylink/).
   2. Choose custom partition while installing > use at least 2 partitions for the installing (1 which is main for **Root** `/` and one which is ~500MB for **Boot** `/boot/etc`)
4. Update & Upgrade

   ```bash
   sudo apt update & sudo apt upgrade
   ```

5. Download and install [Google Chrome](https://www.google.com/chrome).
   1. Sign in to Google Account + sync all extensions + settings.
   2. Disable Tab hover information: Go to [chrome://flags/](chrome://flags/) and search "tab hover" then choose "Disable".
   3. Install also these extensions:
      1. [mate translate](https://chrome.google.com/webstore/detail/mate-translate-%E2%80%93-translat/ihmgiclibbndffejedjimfjmfoabpcke), [google dictionary](https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja), [TabCloud](https://chrome.google.com/webstore/detail/tabcloud/npecfdijgoblfcgagoijgmgejmcpnhof), [raindrop](https://chrome.google.com/webstore/detail/raindropio/ldgfbffkinooeloadekpmfoklnobpien), [last pass](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd), [AVIM](https://chrome.google.com/webstore/detail/avim-vietnamese-input-met/opgbbffpdglhkpglnlkiclakjlpiedoh), [adblock](https://chrome.google.com/webstore/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom), [GNOME Shell integration](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep).
      2. Google Aut alternative on Chrome: use [this](https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai).
6. Install [Guake Terminal](/terminal#guake-terminal) (drop-down terminal supporting tabs). We install it first because we working mainly on terminal.

   ```bash
   sudo apt-get install guake
   # then add it to startup applications
   #
   # load preferences
   guake --restore-preferences ~/Downloads/guake_prefs
   ```

7. Install **GNOME Tweaks** from App Store.
8. Install [Dash to panel](https://extensions.gnome.org/extension/1160/dash-to-panel/) extension and use [this config](https://github.com/dinhanhthi/scripts/blob/master/settings/pop!os/dash_to_panel.py) for pop and [this](https://github.com/dinhanhthi/scripts/blob/master/settings/ubuntu/dash_to_panel) for ubuntu.
9. Install [git](https://git-scm.com/download/linux)

   ```bash
   sudo add-apt-repository ppa:git-core/ppa
   sudo apt update
   sudo apt install git
   ```

10. Using (rEFInd)](https://www.rodsbooks.com/refind/)

    ```bash
    sudo apt-add-repository ppa:rodsmith/refind
    sudo apt-get update
    sudo apt-get install refind
    ```

    In case you wanna hide some options in the boot manager with rEFInd, you can use [[-]] button to hide it.

    <div ><div class="hsbox">
    <div class="hs__title">
    Old method
    </div>
    <div class="hs__content">

    [**Pop!_OS**] **Dual boot with Windows** and others Linux distro: different from Ubuntu (using **grub**), Pop!\_OS uses **systemd-boot** -> follow [this guide](https://pop-planet.info/forums/threads/copy-the-microsoft-bootloader-into-pops-efi-beginners-guide.357/).

    ```bash
    # 1. Open Disks
    # Click on "play" icon on the partition having "Partition type" is "EFI system"
    #
    # 2. Run to check the mount point of these partitions
    lsblk -o NAME,FSTYPE,FSSIZE,MOUNTPOINT
    # output (s/t like that)
    # nvme0n1
    # ├─nvme0n1p1 vfat     176M /media/thi/ESP # <- this is windows mounting point
    # ├─...
    # └─nvme0n1p9 vfat     511M /boot/efi
    #
    # 3. copy to pop!_os
    sudo cp -r /media/thi/ESP/EFI/Microsoft /boot/efi/EFI
    #
    # 4. Add timeout (wait for choosing)
    sudo nano /boot/efi/loader/loader.conf
    # add below others
    timeout 15
    ```

    </div>
    </div>

11. Make **Alt-Tab** show windows instead of applications: change in Settings > Keyboards > Custom keyboards > Switch windows. Gnome: install [this one](https://extensions.gnome.org/extension/1437/current-screen-only-for-alternate-tab/) to switch between windows on current screen only.
12. [**Optional**] Make emojis showing up

    ```bash
    sudo apt install fonts-noto-color-emoji
    ```

    After that (make browser recognize more icons), create a new file

    ```bash
    ~/.config/fontconfig/conf.d/01-emoji.conf
    ```

    with [this content](https://github.com/dinhanhthi/scripts/blob/master/settings/ubuntu/01-emoji.conf).

13. Cannot use f keys on keyboard Keychron K8 ([this](https://github.com/Kurgol/keychron/blob/master/k2.md) is useful too):

    ```bash
    echo 0 | sudo tee /sys/module/hid_apple/parameters/fnmode
    # restore
    echo 1 | sudo tee /sys/module/hid_apple/parameters/fnmode
    ```

    **Hint**: You can add this command to a script on startup.

14. [__Ubuntu only__] Auto install drivers

    ```bash
    sudo ubuntu-drivers autoinstall
    ```

    In case you wanna switch between Intel (more power efficient) and NVDIA driver (more powerful)

    ```bash
    sudo prime-select intel
    sudo prime-select nvidia
    ```

15. [__Ubuntu only__] Check the NVDIA driver and install the newest version: check in **Additional Drivers**. In case you wanna remove it and reinstall it later, use

    ```bash
    sudo apt purge nvidia-*
    ```

16. [__Ubuntu only__] Install GNOME Shell extensions

    ```bash
    sudo apt install gnome-shell-extensions
    ```

    Install also [chrome extension](https://extensions.gnome.org/). Go to the corresponding extension link and turn it on and install it. List of useful extensions: [Start Overlay in Application View](https://extensions.gnome.org/extension/1198/start-overlay-in-application-view/), [ESC to close overview from applications list](https://extensions.gnome.org/extension/1122/esc-to-close-overview-from-applications-list/), [Caffein](https://extensions.gnome.org/extension/517/caffeine/), [Alt-Tab Switcher Popup Delay Removal](https://extensions.gnome.org/extension/1317/alt-tab-switcher-popup-delay-removal/), [Sound Input & Output Device Chooser](https://extensions.gnome.org/extension/906/sound-output-device-chooser/), [gtile](https://extensions.gnome.org/extension/28/gtile/), [icon-hider](https://extensions.gnome.org/extension/351/icon-hider/) (on gnome taskbar), [Emoji selector](https://extensions.gnome.org/extension/1162/emoji-selector/), [Current screen only on window switcher](https://extensions.gnome.org/extension/1437/current-screen-only-for-alternate-tab/).

17. Install video codecs,

    ```bash
    sudo apt install ubuntu-restricted-extras
    ```

18. [**Pop!_OS**] Install snap: `sudo apt update && sudo apt install snapd`.
19. Install email client Mailsrping with snap: `sudo snap install mailspring`.

    ```bash
    # Copy icon
    sudo cp /var/lib/snapd/desktop/applications/mailspring_mailspring.desktop /usr/share/applications/
    ```

20. Install **GoldenDict** (app store) and [dictionaries](https://drive.google.com/open?id=1jna8_grA-wyhPrq8BiB7ypadvW3tTlIv).
21. [Visual Studio Code](https://code.visualstudio.com/) and its basic extensions: Bracket Pair Colorizer, Docker, Linux Themes for VS Code, Markdown All in One, Markdown Shortcuts, Remote Development, Python, Auto Close Tags

    Also add below settings to setting json file (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> and search "Preferences: Open Settings (JSON)", it's in `~/.config/Code/User`)

22. Install Git Client as [Gitkraken](https://www.gitkraken.com/). Log in with Github account and clone [all working repositories](https://github.com/dinhanhthi?tab=repositories).
23. Turn off Gnome Shell Activities Animations (click on window taskbar to toggle max/min),

    ```bash
    gsettings set org.gnome.desktop.interface enable-animations true # enable
    gsettings set org.gnome.desktop.interface enable-animations false # disable
    ```

24. [IBUS Bamboo](https://github.com/BambooEngine/ibus-bamboo), Vietnamese Input Method. Need to restart Ibus and choose Bamboo in the keyboard layout. You can use also <kbd>Shift</kbd> + <kbd>~</kbd> for changing the options (Removing the underline, for example) -- You have to switch to Vietnamese Input before using this shortcut. Use <kbd>Super</kbd> + <kbd>Space</kbd> to change between input methods.
25. [**Optional**] You may need to [install Python](/python-installation/) before install (successfully) Overgrive.
26. Google Drive client for Ubuntu: [OverGrive](https://www.thefanclub.co.za/overgrive) (5\$ for each account). An alternative to [Vgrive](https://github.com/bcedu/VGrive).

    ```bash
    # startup commandline for overgrive
    python3 /opt/thefanclub/overgrive/overgrive
    ```

27. **LaTeX**

    ```bash
    sudo apt-get install texlive-full # 5GB
    sudo apt-get install texmaker
    ```

28. If you install Matlab, you can install `matlab-support` to add matlab icon to applications. Note that, if matlab exe file is at `/usr/local/MATLAB/R2017b/bin/matlab`, we add the location of folder as `/usr/local/MATLAB/R2017b/`.
29. Use <kbd>super</kbd> + <kbd>E</kbd> to open **Nautilus File Manager**: change in Keyboard shortcut > Custom Shortcut with command `nautilus`.
30. Default text editor `gedit`, you can use this command in terminal.
31. ~~**Gnome Calendar**~~ in app store.
32. Screen Recorder, use **Kazam** (app store). If cannot recognize mic and speaker, read [this solution](https://askubuntu.com/questions/1234314/screen-recording-applications-are-not-detecting-audio-in-ubuntu-20-04). An alternative is [SimpleScreenRecorder](https://www.maartenbaert.be/simplescreenrecorder/).
33. VLC (app store). If there is a problem of displaying video (there is only sound without video), check [this](https://askubuntu.com/questions/668834/vlc-media-player-is-not-displaying-video-but-audio-works).
34. Read SD card

    ```bash
    sudo apt-get install exfat-utils exfat-fuse
    ```

35. If you wanna make nautilus default again:

    ```bash
    xdg-mime default nautilus.desktop inode/directory application/x-gnome-saved-search
    gsettings set org.gnome.desktop.background show-desktop-icons true
    ```

36. If you wanna make some web app a desktop app, use [nativefier](github.com/jiahaog/nativefier).
37. Bluetooth problem on Dell XPS 15 only: cannot turn on bluetooth ⇒ Try turn off and turn on again the bluetooth in BIOS setting.
38. Useful shortcuts:
    - Capture fullscreen: `Ctrl+Alt+Print` (photos will be saved in **Pictures**)
    - Show desktop: set in Keyboards settings, try to find "Hide all normal windows".
39. [__Only Ubuntu__] Connect Airpod to Ubuntu 20.04:

    ```bash
    # check bluetooth service is running
    hciconfig -a
    #
    # open a file
    sudo nano /etc/bluetooth/main.conf
    #
    # add
    ControllerMode = bredr
    #
    # restart bluetooth service
    sudo /etc/init.d/bluetooth restart
    #
    # disconnect other headphone device
    # press and hold backward button in the airpod case (flash light)
    # connect to airpod as other device via bluetooth
    ```

40. Location of `.desktop` files,

    ```bash
    ~/.local/share/applications/
    /usr/share/applications/
    /var/lib/snapd/desktop/applications/
    # or
    locate *.desktop # bash
    locate \*.desktop # zsh
    ```

41. [__Optional__]Xbox controller bluetooth connection: check [this](https://askubuntu.com/questions/998144/how-can-i-use-my-xbox-one-s-controller-via-bluetooth).
42. Remove icon from dash application

    ```bash
    sudo add-apt-repository ppa:caldas-lopes/ppa
    sudo apt-get update
    sudo apt-get install ezame
    ```

43. Restore [dconf setting](https://github.com/dinhanhthi/scripts/tree/master/settings):

    ```bash
    dconf load / < dconf-settings.ini
    # or
    cat dconf-settings.ini | dconf load /
    ```

44. Restore [custom keyboard shortcuts](https://github.com/dinhanhthi/scripts/tree/master/settings),

    ```bash
    # load
    dconf load /org/gnome/desktop/wm/keybindings/ < keybindings.dconf
    dconf load /org/gnome/settings-daemon/plugins/media-keys/ < keybindings.dconf
    ```

45. [__Optional__] Disable touchpad automatically when plugging mouse:

    ```bash
    sudo add-apt-repository ppa:atareao/atareao
    sudo apt update
    sudo apt install touchpad-indicator
    # then open > click on icon > preferences
    # > action tab > "Disable touchpad when mouse plugged"
    ```

46. Other applicatons:
    1. [Skype](https://www.skype.com/en/get-skype/)
    2. [Extreme Download Manager](https://subhra74.github.io/xdm/) (uninstall by running as root `/opt/xdman/uninstall.sh`)
    3. ~~[AO](https://github.com/klaussinani/ao) (MS to do for Ubuntu): `snap install ao`~~
    4. **Shotwell** or **gThumb** (image viewer + quick editor, install on Store)
    5. **KolourPaint** (photo editor supports cut and move a selection like Paint on Windows, install from AppStore)
    6. **Cheese** (camera app)
    7. [Drawing](https://maoschanz.github.io/drawing/)
    8. ~~[Stacer](https://oguzhaninan.github.io/Stacer-Web/) (optimizer system like Advanced System Care)~~
    9. ~~[Google Music](https://www.googleplaymusicdesktopplayer.com/)~~. This one: [Youtube Music Desktop](https://snapcraft.io/youtube-music-desktop-app) (install with snap) -- Remove the coincisive keys with the system's.
    10. ~~[Authenticator](https://flathub.org/apps/details/com.github.bilelmoussaoui.Authenticator)~~
    11. **alacarte** (Main Menu, can be found in App Store): change/add icon in launcher.
47. Swap function keyboards on [Logitech K380](https://www.logitech.com/en-us/product/multi-device-keyboard-k380), using [this tool](https://github.com/jergusg/k380-function-keys-conf) (try all keyboard hidraws if you are not sure!).
48. Force Unity Dash to index all files on Home: `sudo updatedb` (install by `sudo apt-get install mlocate`)
49. [__Only Ubuntu__] There are 2 ubuntu softwares in dash? (ref [this question](https://askubuntu.com/questions/1235835/ubuntu-software-doesnt-work-and-why-are-there-two-software-center-in-ubuntu-20)). "Ubuntu software" is pre-installed snap store (run by `snap-store`), the other is `gnome-software`.
50. <mark>Backup before installing a new system.</mark>
    - Settings in `~/.config/` or `~/.<software-name>`
    - All apps in `~/apps/` with their desktop files in `~/.local/share/applications/`
51. **Pop!\_OS Tips**:
    1. `Super` + `Y`: toggle tiling mode.
    2. Add a windows/applition exepton of tiling mode (it won't be counted)
    3. Make clocks + dates 2 lines -> [tutorial](https://askubuntu.com/questions/1081793/how-to-display-date-under-time-in-gnome).
       - Install [clock override extension](https://extensions.gnome.org/extension/1206/clock-override/).
       - Using ` %H:%M%n%d/%m/%Y` in _text to display instead of the clock_ (with the spaces so that they are center aligned).
