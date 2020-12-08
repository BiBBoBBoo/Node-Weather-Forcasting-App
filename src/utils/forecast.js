const request = require('request')


const forecast = (lattitude, longitude, callback)=>{

    // weatherstack.com for the weather info: https://weatherstack.com/documentation (documentation)
    const url = 'http://api.weatherstack.com/current?access_key=9e671629d1b3258aa7240070509e5c6a&query='+ lattitude + ',' + longitude +'&units=m'

    request({url, json:true}, (error, response)=>{
        
        if(error){
            callback(('Unable to connect to the weather service!!!'), undefined)
        }
        else if(response.body.error){
            callback(('Error!!!') + ' ' + response.body.error.code + (' Location not found'), undefined)
        }
        else{
            callback(undefined, response.body.current.weather_descriptions[0] + '. The current temperature is ' + response.body.current.temperature + '. It feels like ' + response.body.current.feelslike)
        }
    })
}

module.exports = forecast