// Main starting point of the application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// DB setup
mongoose.connect('mongodb://localhost:auth/wedding-server')

// App setup
app.set('views', './views');
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
app.engine('html', require('ejs').renderFile);
router(app)

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on ', port)