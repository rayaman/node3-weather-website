const hbs = require('hbs')
const path = require('path')
const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Exptess config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const paritalsPath = path.join(__dirname, '../templates/partials')
const name = "Ryan Ward"

// Setup handlebars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(paritalsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather",
        name
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About me",
        name
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Need help?",
        name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be entered!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })
        forecast(latitude, longitude, (error, data) => {
            if (error) return res.send({ error })
            res.send({
                forecast: data.summery + " It is currently " + data.temperature + " There is a " + data.precipProbability + "% of rain.",
                address: req.query.address,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: "Help article not found",
        title: "404 Page Not Found!",
        name
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: "The page you were looking was not found!",
        title: "404 Page Not Found!",
        name
    })
})

app.listen(3000, () => {
    console.log("Server Running on port 3000!")
})