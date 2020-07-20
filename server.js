// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express =  require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
const server = app.listen(port, ()=>{console.log(`running on localhost ${port}`)})

// Get request 
app.get('/all', function(req, res){
    res.send(projectData)
})

//Post request
app.post('/add', postData)

function postData (req, res){
    
    let data = req.body
    console.log(data)

    projectData['temp'] = data.temp
    projectData['feel'] = data.feeling
    projectData['date'] = data.date

    res.send(projectData);

    console.log('projectData ', projectData);
 }
