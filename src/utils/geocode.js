const request = require('postman-request');

const geocode = (address, callback) => {
    const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiazFhcmE2biIsImEiOiJja3o2dmF1MjcwY3AzMnFtcHFyZHY0ZzVtIn0.CBbjIQzIHdzKWi18I1jxwg&limit=1`

    request(geoCodingUrl, (error, response, body)=>{
        if(error){
            let error_msg = `Error connecting to geo coding url ${error}`  
            callback(error_msg, undefined)
        } else if(!(JSON.parse(body)).features.length){
            callback(`Unable to find results for address ${address}`, undefined)
        }
        else {
            const geoCodingInfo = JSON.parse(body)
            callback('', {
                latitude: geoCodingInfo.features[0].center[1],
                longitude: geoCodingInfo.features[0].center[0],
                place_name: geoCodingInfo.features[0].place_name
            })
            // const geoCodingInfo = JSON.parse(body)
            // let error_msg = `Error wile connecting to geoCoding Api ->${geoCodingInfo.message}`
            // callback(error_msg, undefined)
        }
    })
}

module.exports = {
    geocode: geocode
}