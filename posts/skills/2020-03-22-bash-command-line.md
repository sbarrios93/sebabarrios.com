---
layout: post
title: "Bash"
tags: [Skills, Linux]
toc: true
icon: terminal.svg
keywords: "cmder cmd terminal powershell macos mac linux ubuntu windows vim editor download wget check ip permission administrator block compress file zip rar unzip RAM CPU printenv environmental variables alias quick command quick shortcut multiple commands and script bash print print tree folder files structure windows terminal sh file"
---

Bash commands are mainly supported in MacOS, Linux but also support in Windows. You can use integrated tools for using bash on these platforms.

👉 Note: [Terminals](/terminal/).
👉 Note: [Bash screen](/screen/).

## Tools

- **Apps**: [cmder](https://cmder.net/) (Windows), [iTerm2](https://www.iterm2.com/) (MacOS), [Guake Terminal](http://guake-project.org/) (Linux).
- **Online**: [repl.it](https://repl.it/languages/bash)

## Hotkeys

- <kbd>Ctrl</kbd> + <kbd>C</kbd> : interrupt current tasks.
- <kbd>Ctrl</kbd> + <kbd>L</kbd> : clear the screen.
- <kbd>Tab</kbd> : autocomplete the commands / directories / file names / ....
- <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> : paste from clipboard.
- For a long list: <kbd>Enter</kbd> to continue to read, <kbd>q</kbd> to quit.
- [[Ctrl]] + [[A]]: move cursor to the beginning of the line.

## Multiple commands

~~~ bash
# run at once
command_1 && command_2
~~~

## `.sh` file

<div class="col-2-equal">

``` bash
# using script: file.sh
#!/bin/sh
echo 'some info'
command_1
command_2

# and then sh file.sh
```

``` bash
# with arguments
$file1 = $1
wc $file1 # word count

# multiple input args
for FILE1 in "$@"; do
	wc $FILE1
done
```
</div>

``` bash
NAME="defaut" # default value! DON'T HAVE SPACE!!!
# with flags
while getopts n:f: option; do
	case "${option}"
		in
			n) NAME=${OPTARG};;
			f) FILE=${OPTARG};;
	esac
done

echo $NAME
wc $FILE

# how to use?
sh test.sh -n "ThiD" -f test.md
```

## Search / grep / sed

<div class="col-2-equal">

``` bash
# all files / folders containing 'abc'
ls | grep -i abc
```

``` bash
# find command lines containing 'abc'
dpkg -l | grep -i abc
```

``` bash
# search and extract a part of result
pip show numpy
# Location: /usr/lib/python3/dist-packages
pip show numpy | sed -n 's/Location: //p'
# /usr/lib/python3/dist-packages
```
</div>

## Check info

### System

<div class="col-2-equal">

``` bash
# Change password
passwd
```

~~~ bash
# DISK SPACE
df -h
~~~

``` bash
# like monitor
top
```

~~~ bash
# MEM USAGE
free -m
~~~

~~~ bash
# ALL ENV
printenv

# add new
export ABC=/xyz/thi/
~~~

``` bash
# NVIDIA
nvidia-smi
lspci -nn | grep '\[03' # another way
```

``` bash
# list of devices
lsusb
```

``` bash
# list display screen
xrandr --listactivemonitors
```
</div>

~~~ bash
# CPU
cat /proc/cpuinfo | grep 'model name' | uniq # model
cat /proc/cpuinfo | grep 'vendor' | uniq # vendor
cat /proc/cpuinfo | grep processor | wc -l # number of processes
~~~

### Folders / Files

<div class="col-2-equal">

~~~ bash
# CHANGE ACTIVE DIR
cd <dir>
cd # to the startup dir
cd / # to root
cd .. # to father dir
cd - # back to previous dir
~~~

~~~ bash
# CREATE NEW FOLDER
mkdir <dir>
~~~

~~~ bash
# LIST
ls
ls -a # including hidden
ls | grep 'ubuntu' # files containing 'ubuntu' in name
~~~

~~~ bash
# CURRENT PATH
pwd
~~~

~~~ bash
# FOLDER/FILE SIZE
du -hs <directory / file>
# `h` : human readable (6.7G)
# `s` : display size

# all folders/files of current folder
du -hs * | sort -rh

# only folders
du -sh ./*/

# only first 5 retrieves
du -h /home/thi/ | sort -rh | head -5
~~~

~~~ bash
# REMOVING
rm <file>
rm -f <file> # force to remove
rm -rf <dir> # remove folder
rmdir <empty-dir> # remove empty
~~~

~~~ bash
# COMPRESS
zip file.zip file/folder
unzip file.zip # decompress
~~~

~~~ bash
# PRINT TREE folder structure
tree
tree -d # only folders
tree -d -I 'abc' # except folder "abc"
tree -I 'abc|xyz' # except folder "abc" and "xyz"
tree -I 'test_*|__pycache__|__init__.py' # use wildcat
tree -L 2 # level 2
tree -P 'test_' # list only files starting with "test_"
~~~
</div>

### Permission

👉 [Chmod code calculator](https://chmodcommand.com/).

<div class="col-2-equal">

``` bash
# list of groups
groups
```

``` bash
# which groups a user belongs to
group <user_name>
id -nG # or
```

``` bash
# check info of a current user
id <user_name>
```

``` bash
# list all members of a group
grep <group_name> /etc/group
```

~~~ bash
# CHECK PERMISSION
ls -l
ls -l <file>
~~~

~~~ bash
# ADD existing USER to existing GROUP
sudo usermod -a -G groupName userName
~~~

~~~ bash
# CHANGE PERMISSION
chown <user>:<group> file
chown -R thi:root folder # folder & children
~~~
</div>

### Network

<div class="col-2-equal">

~~~ bash
# CHECK IP
ifconfig
ipconfig # windows
~~~

~~~ bash
# DOWNLOAD A FILE
wget https://website.com/filename.ext
~~~

``` bash
# open ports
sudo apt install nmap
nmap localhost
```

``` bash
# very simple server
python3 -m http.server # localhost:8000
python3 -m http.server 1337 # localhost:1337
```

``` bash
# current running servers
sudo apt install net-tools
netstat -lepunt

# kill a process, e.g. 29231/ssh
kill <pid> # eg. kill 29231
```

``` bash
# mb data used
sudo apt install vnstat
vnstat -d
```
</div>

~~~ bash
# INTERNET SPEED (need python)
curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -
~~~

``` bash
# (1st test on mac)
# Look for which ports are running
# Find their PID
# Kill them
brew install nmap
nmap localhost
lsof -i:8080
kill <PID>

# in case above command cannot solve the problem
sudo lsof -i -P | grep "8080"
```

### Text file

<div class="col-2-equal">

~~~ bash
# QUICK LOOK CONTENT
more file.txt
cat file.txt
~~~

~~~ bash
# JUST CREATE
touch file.txt
~~~

~~~ bash
# CREATE + MODIFY
nano file.txt # Ctrl+X to quit
vim file.txt # ESC, :q to quit
~~~

~~~ bash
# SEARCH STRING
grep "string" file.txt
~~~

~~~ bash
# ADD A LINE TO A FILE WITHOUT OPENNING IT
echo "hello 'thi' world" >> my_file.txt
~~~
</div>

### Images

``` bash
# open an image
eog image_file.jpg
```

## Symbolic link (shortcut)

``` bash
ln -s original_folder sym_folder

# remove
rm sym_folder
```

## Alias

Create your own "alias" command for short,

<div class="col-2-equal">

~~~ bash
# CREATE
alias yourAlias='cd /usr/'
alias yourAlias=cd /usr/ # windows
~~~

~~~ bash
# CALL
yourAlias
~~~

~~~ bash
# LIST OF ALIASES
alias
alias abc # "abs" stands for what?
~~~

``` bash
# remove an alias
unalias abc
```
</div>

``` bash
# group of commands
my_alias() {
    screen -S dat -dm bash -c "cd /dinhanhthi.com; iserve; exec sh"
}
```

``` bash
# list of commands
my_alias(){
    cd /home/user/git/abc/
    git add .
    git commit -m "abc"
    git push
}
```

{:.noindent}
- **Linux** / **MacOS**: Add your alias to `.bash_aliases` (in home dir, `printenv HOME`) if you wanna store your alias permanently.
- **Windows**: Using [cmder](https://cmder.net/) (its [setting file](/files/cmderSetting.xml)), add more aliases to `<cmder-install>/config/user_aliases.cmd`. You can also add (automatically) on the cmder UI, it adds them for you to the `.cmd` file.


## Create / Copy / Cut / Paste

<div class="col-2-equal">

``` bash
# Create a new folder
mkdir <folder>
mkdir -p <folder> # already exist accepted
```

~~~ bash
# MOVE
mv <old-dir> <new-dir>
move <old-dir> <new-dir> # windows
~~~

~~~ bash
# RENAME a file/folder
mv olname.txt newname.txt
~~~

~~~ bash
# COPY
cp file file
cp -r file&dir file&dir
~~~
</div>

## Display

<div class="col-2-equal">

``` bash
# only display 3 last directory names
PROMPT_DIRTRIM=3
```

``` bash
# display only user:current_folder#
PS1='\u:\W\$ '
```
</div>

## References

- [How to Pass Arguments to a Bash Script](https://www.lifewire.com/pass-arguments-to-bash-script-2200571)