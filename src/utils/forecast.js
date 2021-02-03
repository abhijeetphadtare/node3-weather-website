const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=906d32837e236036484c050d11f4cc9f&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error,{ body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, "Localtime :" + body.location.localtime +  body.current.weather_descriptions[0] +".  It is current " + body.current.temperature + " ℃ degress out. it feels like " + body.current.feelslike + "℃ degress out. " + " Windspeed :"+body.current.wind_speed +"Km/h  ," + "Humidity :" + body.current.humidity + "% ," + " Precipitaion :" + body.current.precip + "% ."  )
        }
    })
}

module.exports = forecast