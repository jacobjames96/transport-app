const request = require('request')
const mapboxgl = require('mapbox-gl')
mapboxgl.accessToken = 'pk.eyJ1IjoiamFrZWphbWVzOTYiLCJhIjoiY2t5b3J1M3BwMDJ5dzJwbnBzbjR5ZXhhYSJ9.gPK8xDdBYCfQmu0tBHSqVA'


const geocode = ({address, searchRadius}, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFrZWphbWVzOTYiLCJhIjoiY2t5b3J1M3BwMDJ5dzJwbnBzbjR5ZXhhYSJ9.gPK8xDdBYCfQmu0tBHSqVA&limit=1'

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try again with different search term', undefined)
        } else {
            const feature = body.features[0]
            const placeName = feature.place_name
            const latitude = feature.center[1]
            const longitude = feature.center[0]

            // Create a new mapbox Long Lat object with the found coordinates
            const ll = new mapboxgl.LngLat(longitude, latitude )

            // Calculate coordinates of a bounding box at radius given
            const radius = searchRadius * 1000
            const bounds = ll.toBounds(radius)
            const bbox = {
                latmax: bounds.getNorth(),
                latmin: bounds.getSouth(),
                lonmax: bounds.getEast(),
                lonmin: bounds.getWest()
            }
            //console.log(bbox)

            callback(undefined, {
                location: placeName,
                latitude,
                longitude,
                bbox
            })
        }
    })
}

module.exports = geocode
