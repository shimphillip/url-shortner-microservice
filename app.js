// I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
// Example : {"original_url":"www.google.com","short_url":1}
// If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
// HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
// When I visit the shortened URL, it will redirect me to my original link.
// example: POST [project_url]/api/shorturl/new - https://www.google.com

const express = require('express')
const morgan = require('morgan')
const router = require('./routes')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('Homepage')
})

app.use(express.json())
app.use(router)

module.exports = app
