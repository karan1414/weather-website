const request = require('postman-request');

const getWeather = (latitude, longitude, callback)=>{
    url = `http://api.weatherstack.com/current?access_key=21d7e9862601c2615df26be2d093d6a3&query=${latitude},${longitude}`
    request(url, (error, response, body)=>{
        if(error){
            const error_msg = `Error while making api request ${error}`
            callback(error_msg, undefined)
        } else if(((JSON.parse(body)).current.temperature)){
            const weatherInfo = JSON.parse(body)
            callback('', {
                weather_descriptions: weatherInfo.current.weather_descriptions[0],
                current_temperatue: weatherInfo.current.temperature,
                feelslike: weatherInfo.current.feelslike,
                humidity: weatherInfo.current.humidity
            })
        } else {
            const weatherInfo = JSON.parse(body)
            let error_msg = "Error while connecting to weather api" 
            callback(error_msg, undefined)
        }
    })
}

module.exports = {
    getWeather: getWeather
}