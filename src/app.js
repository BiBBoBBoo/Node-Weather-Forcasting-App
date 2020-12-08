const express = require('express')

const path = require('path') // used to direct to a specific file/folder

const app = express()

const hbs = require('hbs')

const forecast = require('./utils/forecast')

const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000


// Defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handkebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // navigates to the static files and loads them upon being requested


// Index
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Rishav Kundu'
    })
})


// About
app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About',
        name: 'Rishav Kundu'
    })
})


// Help
app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        name: 'Rishav Kundu'
    })
})


// Weather
app.get('/weather', (req, res)=>{

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{ // here the two arguments are philadelphia ie the addresss and the 2nd is call back which is error and data
    
        if(!req.query.address){
            return res.send({
                error: 'Please enter a valid address!!'
            })
        }
        else{
            if(error){
                return res.send({
                    error: error
                })
            }
        
            forecast(latitude, longitude, (error, dataFore) => {
        
                if(error){
                    return res.send({
                        error: error
                    })
                }
                
                res.send({
                    location: location,
                    dataFore: dataFore
                })
                // console.log(location)
                // console.log(dataFore)
            })
        }
        
    })
})


// Product(Demo)
app.get('/products', (req, res)=>{
    if(!req.query.search){ // ! is the exclamation mark that stands for no, wichic means if provide s the oppposite of what you have called after it
        return res.send({
            error: 'YOu must provide a search term',
        })
    }

    console.log(req.query.search)
    res.send({
        forcast: [],
    })
})


// Help/Error
app.get('/help/*', (req, res)=>{
    res.render('error',{
        message:'Article not found',
        title:'ERROR 404!!',
        name: 'Rishav Kundu'
    }) 
})


// Normal Error
app.get('*', (req, res)=>{ // Express provides us a * charector which is used to define error cases and app.get for this always comes at last
    res.render('error',{
        message:'Page not found',
        title:'ERROR 404!!',
        name: 'Rishav Kundu'
    }) // Express provides us a * charector which is used to define error cases and app.get for this always comes at last
})





// Fires up the server
app.listen(port, ()=>{
    console.log('Server is up and running!!')
})






/*-------------------------------------------------------------------NOtes----------------------------------------------------------------------*/
/*
Show file path and folder path

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
*/

/*
if(!req.query.address){
        return res.send({
            error: 'PLease provide an address!!'
        })
    }

    console.log(req.query.address)
    res.send({
        forcast: 'Its barely cold',
        location: req.query.address
    })
*/