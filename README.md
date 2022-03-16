# Station_M-t-o

The technologies used are Influxdb, VueJS and Node.

## Principle

The aim of this project is to create the software part of a weather station consisting of a sensor and a control unit.
<br/>Each sensor is made up of a raspberry pi and the central unit is installed in an independent way.
<br/>Raspberry pi of the group : piensg032

## Routine

Read the weather data from the raspberry and store it in a database named 'measures_station'.

## API

Retrieve the data stored in the 'measures_station' database and format it to make it accessible on port 8080.

## Central

Configurable dashboard also accessible on port 8080.
<br/>The user has the ability to view data extracted from the API on one or more probes over defined time periods.
<br/>In addition, a map section allows the user to see the geographical position of selected probes.

## Project launch

To execute, launch:
```
./start.sh
```
