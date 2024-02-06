const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))


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