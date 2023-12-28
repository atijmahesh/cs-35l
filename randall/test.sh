#!/bin/bash

valid=false
num=$((1 + RANDOM % 10))

num2=$(./randall "$num" | wc -c)

if [ "$num" -eq "$num2" ]; then
    valid=true
fi

num3=$(./randall 214000 | wc -c)

if [ "$num3" -eq 214000 ]; then
    valid=true
fi

if [ "$valid" = false ]; then
    echo "The program produces the incorrect output."
else
    echo "The program produces the correct output."
fi
