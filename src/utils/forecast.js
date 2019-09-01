const request = require('request')
const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/dba04cfb8130fbcd3d87af36c47bab23/${lat},${long}`
    request({ url, json: true }, (error, { body }) => {
        if (body.error) {
            callback('Unable to connect to weather service!')
            return
        } else if (body.err) {
            callback("Unable to find location!")
            return
        } else {
            callback(undefined, {
                summery: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                visibility: body.currently.visibility,
            })
            return
        }
    })
}
module.exports = forecast