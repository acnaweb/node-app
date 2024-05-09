#!/bin/bash

echo "Testing"

RESULT="`wget -qO- http://localhost:8090`"
wget -q localhost:8090

if [ $? -eq 0 ]
then
    echo "service running"
elif [ [$RESULT == *"running"*] ]
then 
    echo "app is runing"
    echo $RESULT
else
    echo "NOT OK"
    exit 1
fi
    