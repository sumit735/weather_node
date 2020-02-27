const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();

const  port = process.env.PORT || 3000; //only for heroku

// define path for express config
const htmlFilePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(htmlFilePath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage Here',
        name: 'Sumit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About goes here',
        name: 'sumit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is a help message',
        body: 'Here you can find all the help you need',
        name: 'sumit'
    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.send({
            error: 'wrong input'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        // console.log(latitude, longitude, location)

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location,
                forecastData,

            })
        })
    })

    // res.send(
    //     {
    //         forecast: 'tjekfhhre 25 degrees',
    //         location: req.query.address
    //     }
    // );
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        data: 'Help Article Not Found',
        name: 'sumit'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        data: 'Page Not Found',
        name: 'sumit'
    });
})

app.listen(port, () => {
    console.log('server is running at port '+ port);
})