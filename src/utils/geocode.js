const request = require('request')


const geocode = (address, callback)=>{ // here the two attributes are address and callback

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmliYm9iYm9vIiwiYSI6ImNraTR5azNoOTFwN2YycW1zdmU5MXFvZTUifQ.BKSCPM_yiEyeTCkL_hVE9g&limit=1'
    
    request({url, json:true}, (error, response)=>{

        if(error){
            callback(('Unable to connect to the weather service!!!'), undefined)
        }
        else if(response.body.features.length===0){
            callback(('Error!!! Location not found!!'), undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode