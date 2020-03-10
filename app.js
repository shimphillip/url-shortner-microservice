const express = require('express')
const morgan = require('morgan')
const router = require('./routes')

const app = express()

// log to the console requests and responses in the dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Homepage')
})

app.use(express.json())
app.use(router)

module.exports = app
