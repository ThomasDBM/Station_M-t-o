# Station_M-t-o

The technologies used are Influxdb, VueJS and Node.

## Principle

The aim of this project is to create the software part of a weather station consisting of a sensor and a control unit.
<br/>Each sensor is made up of a raspberry pi and the central unit is installed in an independent way.
<br/>Raspberry pi of the group : piensg032

## Routine

Read the weather data from the raspberry and store it in a database named 'measures_station'.
The files to make this are store in /home/pi/fakesonde/DBManage directory.


## API

Retrieve the data stored in the 'measures_station' database and format it to make piensg032:8080/data
The files code are store at /home/pi/API/api
## Central

Configurable dashboard also accessible at piensg032:8080
<br/>The user has the ability to view data extracted from the API on one or more probes over defined time periods.
<br/>In addition, a map section allows the user to see the geographical position of selected probes.

On the raspberypi you will only find the build version at /home/pi/API/api/public

## Project launch

The project is automaticly launch by service startMTO.service when the respberyPi is start.
If it doenst work you can launch it whith the script start.sh locate in /usr/bin.

## Modification

If you make any modification to Centrale code and want to deploy it :
 - build the project
 - place the file which compose the dist directory to /API/api/public and delete the old one wich was in this directory

