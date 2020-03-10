/* eslint-disable camelcase */
require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const shortid = require('shortid')
const app = require('../app.js')
const Url = require('../Models/Url')

const { MONGO_URI } = process.env

beforeAll(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
  } catch (error) {
    process.exit(1)
  }
})

afterAll(() => mongoose.connection.close())

describe('GET /api/shorturl/:short_url', () => {
  it('Request completed unsuccessfully on a bad request', async () => {
    const response = await request(app).get('/api/shorturl/bad-url')
    expect(response.status).toBe(400)
  })

  it('Redirects to its original url when short url is entered', async () => {
    const count = await Url.count().exec()
    const random = Math.floor(Math.random() * count)
    const { short_url, original_url } = await Url.findOne()
      .skip(random)
      .exec()
    const { type, statusCode, headers } = await request(app).get(
      `/api/shorturl/${short_url}`
    )

    expect(type).toBe('text/plain')
    expect(statusCode).toBe(302)
    expect(headers.location).toBe(original_url)
  })
})

describe('POST /api/shorturl/new', () => {
  it('New document succesfully created', async () => {
    const randomNumber = shortid.generate()
    const nate = {
      originalUrl: `https://www.nate${randomNumber}.com`
    }

    // document correctly created
    await request(app)
      .post('/api/shorturl/new')
      .send(nate)
      .then(res => {
        expect(res.status).toBe(200)
      })

    // cleanup
    Url.findOneAndDelete({
      original_url: randomNumber
    })
  })

  it(`New document should not be created on duplicate url`, async () => {
    const freecodecamp = {
      originalUrl: 'https://www.freecodecamp.org/forum/'
    }

    await request(app)
      .post('/api/shorturl/new')
      .send(freecodecamp)
      .then(res => {
        expect(res.status).toBe(400)
        expect(JSON.parse(res.text).error).toBe('duplicate url already exists')
      })
  })
})
