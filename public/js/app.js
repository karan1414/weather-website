const formElement = document.querySelector('form')
const searchValue = document.querySelector('input')
const message = document.getElementById('message')
const result = document.getElementById('result')

message.textContent = ''

formElement.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = searchValue.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        message.textContent = "Loading ...."
        result.textContent = ""
        response.json().then((data)=>{
            if(data.error){
                message.textContent = "Error !"
                result.textContent = data.error
            }
            message.textContent = "Success !"
            console.log(data);
            // result.textContent = data
            result.textContent = `Forecast for given location ${data.address} is ${data.forecast.weather_descriptions}. \n Temparature is ${data.forecast.current_temperatue} but feels like ${data.forecast.feelslike}`
        })
    })
})