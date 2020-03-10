const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes')
const { handle404, logErrors, handleErrors } = require('./handleErrors')

const app = express()

// log to the console requests and responses in the dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.redirect('https://github.com/shimphillip/url-shortner-microservice')
})

app.use(cors())
app.use(express.json())
app.use(router)
app.use(handle404, logErrors, handleErrors)

module.exports = app
