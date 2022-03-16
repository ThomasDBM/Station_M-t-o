#!/bin/bash
cd /home/pi/API/api
nohup npm start&

cd /home/pi/fakesonde/DBManage
nohup ./boucle.sh&
cd ./CountBucket
nohup npm start&