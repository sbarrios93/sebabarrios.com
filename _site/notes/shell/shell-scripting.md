---
title: Shell Scripting
reference:
date: 2021-11-02
tags: Shell
layout: post
publish: True
---

## Hello World

```bash
#!/bin/bash
echo "Hello bash script"
```

### Make it executable

```bash
chmod +x helloScript.sh

# execute
./helloScript.sh
```

## Redirect to file

```bash
#!/bin/bash
# add a line to a file
echo "hello bash script" > helloScript.txt

## append to a file
echo "hello bash script" >> helloScript.txt
```

## Heredoc delimiter

Defines a delimiter so we can add as many lines as we want to the file

```bash
#!/bin/bash
cat << anyString

    hello bash script
    whatever
anyString

cat helloScript.txt
>> hello bash script
>> whatever
```

## If-Else statement

```bash
#!/bin/bash

count=10

# === equal ===
if [ $count -eq 9 ]
then
    echo "count is 9"
else
    echo "count is not 9"
fi

# also
if (( $count == 9 ))
then
    echo "count is 9"
else
    echo "count is not 9"
fi

# === not equal ===
if [ $count -ne 9 ]
then
    echo "count is not 9"
else
    echo "count is 9"
fi

# === greather than ===
if [ $count -gt 9 ]
then
    echo "count is greater than 9"
else
    echo "count is not greater than 9"
fi

# === less than ===
if [ $count -lt 9 ]
then
    echo "count is less than 9"
else
    echo "count is not less than 9"
fi
```

### Else-If

```bash
#!/bin/bash

count=10

if [ $count -eq 9 ]
then
    echo "count is 9"
elif [ $count -eq 10 ]
then
    echo "count is 10"
else
    echo "count is not 9 or 10"
fi
```

### AND Operator

```bash
#!/bin/bash

age=10

if [ $age -gt 18 ] && [ $age -lt 30 ]
then
    echo "age is between 18 and 30"
else
    echo "age is not between 18 and 30"
fi

# also
if [$age -gt 18 -a $age -lt 30]
then
    echo "age is between 18 and 30"
else
    echo "age is not between 18 and 30"
fi
```

### OR Operator

```bash
#!/bin/bash

age=10

if [ $age -gt 18 ] || [ $age -lt 30 ]
then
    echo "age is greather than 18 or less than 30"
else
    echo "age is not greather than 18 or less than 30"
fi

# also

if [ $age -gt 18 -o $age -lt 30 ]
then
    echo "age is greather than 18 or less than 30"
else
    echo "age is not greather than 18 or less than 30"
fi
```

## Loop

Run until condition is false
```bash
#!/bin/bash

number=1
while [ $number -lt 10 ]
do
    echo "number is $number"
    ((number++))
done

# also
while [ $number -lt 10 ]
do
    echo "number is $number"
    number=$((number+1))
done
```

### Until loop
Run until condition is true
```bash
#!/bin/bash

number=1
until [ $number -gt 10 ]
do
    echo "number is $number"
    ((number++))
done
```

### For loop

```bash
#!/bin/bash

for i in {0..20..2} # start, end, step
do
    echo "i is $i"
done

# also
for (( i=0; i<10; i++ ))
do
    echo "i is $i"
done
```

### Break

```bash
#!/bin/bash

for (( i=0; i<10; i++ ))
do
    if [ $i -eq 5 ]
    then
        break
    fi
    echo $i
done
```