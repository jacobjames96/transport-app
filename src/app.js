const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getFlights = require('./utils/flights')


// Set up the Express App
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory 
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Transport App',
        name: 'Jacob'
    })
})

app.get('/flights', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, bbox, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        //console.log(latitude, longitude, location, bbox)

        getFlights(bbox, (error, flightData) => {
            if (error) {
                return res.send({ error })
            } else if (!flightData.states) {
                return res.send({ error: 'No Flights' })
            }

            res.send( {
                flights: flightData.states.length,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page Not Found',
        name: 'Jacob',
        errorMessage: '404: Page Not Found'
    })
})

// Start express app
app.listen(port, () => {
    console.log('Server started on port 3000')
})

 const location = 'London'

if (!location) {
    console.log('Please provide a location')
} else {
    geocode(location, (error, {latitude, longitude, bbox, location} = {}) => {
        if (error) {
            return console.log(error)
        }

        console.log(latitude, longitude, location, bbox)

        getFlights(bbox, (error, flightData) => {
            if (error) {
                return console.log(error)
            } else if (!flightData.states) {
                return console.log('No Flights')
            }
            console.log(flightData.states.length)
        })
    })
}