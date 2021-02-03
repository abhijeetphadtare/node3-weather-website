const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
    

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))


const app = express()
const port = process.env.PORT || 3000 

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
//console.log(__dirname)


// setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine','hbs')
hbs.registerPartials(partialPath)
// setup static directory to serve
// it configure the static html page as a home or route page
app.use(express.static(publicDirectoryPath))
// this is route page of application

app.get('', (req, res) => {
     res.render('index',{
         title: 'Weather ',
         name : 'Abhijeet Phadtare'
     })
})

app.get('/about',(req, res) => {
     res.render('about',{
         title:'About Me',
         name : 'Abhijeet Phadtare'
     })
})

app.get('/help', (req, res) => {
    res.render('help',{
       helpText : 'This is some helpful text.',
       title: 'Help',
       name: 'Abhijeet Phadtare'
    })
})

app.get('/weather',(req,res) => {
     // this code run when there is no address provided.
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address term'
        })
    }
      
      geocode(req.query.address, (error, {latitude,longitude, location} = {}  ) => {       
           if (error){
              return res.send({ error })
          }
          
          forecast(latitude,longitude,(error,forecastData) => {
              if (error) {
                  return res.send({ error})
              }

              res.send({

                forecast: forecastData,
                location,
                address : req.query.address
              })
          })

      })
     /*res.send({
         
         forcast : 'it is partly cloudy',
         location: 'philadelphia',
         address: req.query.address
     })*/
 
})

/*app.get('/products',  (req, res) =>{
   if (!req.query.search) {
        return res.send({ // return stop the execution of next code statements
            error : 'You must provide a search term'
        })  
   } 

  console.log(req.query.search)  
  res.send({
           products: []
        
       })
})*/

app.get('/help/*',(req, res) => {
      res.render('404',{
          title :'404',
          name :'Abhijeet Phadtare',
          errorMessage:'Help article not found.'
      })
})
app.get('*',(req, res) => {
      res.render('404',{
          title :'404',
          name: 'Abhijeet Phadtare',
          errorMessage :'Page not found.'

      })
})


app.listen(port, () => {
     console.log('server is up on port ' + port)

})