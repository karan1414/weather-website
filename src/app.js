const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const app = express()

const port = process.env.PORT || 3000

// set path to be given to express config
const indexPagePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static directory to serve
app.use(express.static(indexPagePath, {extensions: ["html"]}))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index', {
        "title": "Welcome to Home Page",
        "name": "Karan Sharma"
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        "title": "Welcome to About Page!",
        "author": "Karan Sharma"
    })
})

app.get('/help', (req,res)=>{
    res.render('index', {
        "helpText": 'This is some helpful text.',
        "title": "This is help msg!",
        "author": "Karan Sharma"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            "error": "Please provide address for weather update!"
        })
    }

    let address = req.query.address
    geocode.geocode(address, (error, {latitude, longitude, place_name}={})=>{
        if(error){
            return res.send({
                "error": error 
            }); 
        }    
        forecast.getWeather(latitude, longitude, (error, foreCastData)=>{
            if(error){
                return res.send({
                    "error": error 
                });
            }

            return res.send({
                "forecast": foreCastData,
                "location": place_name,
                "address": req.query.address
            })            
        })
    })

})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        "title": "404",
        "errorMessage": "Help Article not found",
        "author": "Karan Sharma"
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        "title": "404",
        "errorMessage": "Page Not Found !",
        "author": "Karan Sharma"
    })
})

app.listen(port, ()=>{
    console.log(`App started on port ${port}`);
})