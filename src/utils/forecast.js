const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/61cb5d95d9fdf8f3e13459850c2fa052/' + latitude +',' + longitude + '?units=si';

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Can\'t connect to backend.please check your internet connection', undefined);
        } else if(body.error) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                forecast: body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees, and there is " + body.currently.precipProbability + " % of chance of rain "
            })
        }
    })
}

module.exports = forecast;