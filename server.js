/* eslint-disable no-console */

require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

// Environment variables
const { MONGO_URI, PORT = 4000 } = process.env

// connect to database then start the Express server
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`url-shortner-microservice is listening at ${PORT}`)
    )
  })
  .catch(error => console.error(error))
