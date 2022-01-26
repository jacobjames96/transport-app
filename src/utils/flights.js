const request = require('request')

const getFlights = (bbox, callback) => {
    const url = 'https://opensky-network.org/api/states/all?lamin=' + bbox.latmin + '&lomin=' + bbox.lonmin + '&lamax=' + bbox.latmax + '&lomax=' + bbox.lonmax

    //const url = 'https://opensky-network.org/api/states/all?time=1458564121&icao24=3c6416'
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to opensky', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = getFlights