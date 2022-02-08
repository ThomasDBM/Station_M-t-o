const Influx = require('influx')

const client = new Influx('http://127.0.0.1:8086/measures_station');


influx.writePoints([
{
    measurement: 'tide',
    tags: {
        unit: locationObj.rawtide.tideInfo[0].units,
        location: locationObj.rawtide.tideInfo[0].tideSite,
    },
    fields: { height: tidePoint.height },
    timestamp: tidePoint.epoch,
    }
    ], {
    database: 'ocean_tides',
    precision: 's',
})
.catch(error => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
});