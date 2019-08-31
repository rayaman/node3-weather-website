const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXBpY2tuZXgiLCJhIjoiY2p6eGkydXdzMGc4ajNucHA1dzlza2VkeSJ9.yzfxr1xbEm4lp4jNmq0-Ag&limit=1`
    request({ url, json: true }, (error, response) => {
        const { features } = response.body
        if (error) {
            callback('Unable to connect to the Geolocation service!')
        } else if (features.length === 0) {
            callback('Unable to find entered query. Try another search!')
        } else {
            const { 1: latitude, 0: longitude } = features[0].center
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: features[0].place_name
            })
        }
    })
}
module.exports = geocode