const express = require('express')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
const MONGO_URI = process.env.MONGO_URI;


// Database Connection
mongoose.connect(MONGO_URI) 
.then(()=> {
    console.log('connected to mongo: ' + MONGO_URI);
})
.catch((err) => {
    console.log('Error connecting to mongo:' + err);
});

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



//routes
app.get('/', (req, res) => {
    res.send('Welcome to the Awesome App about Breads!')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

app.get('*', (req, res) => {
    res.send('404')
})

// listen
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})