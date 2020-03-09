/* eslint-disable no-console */

const shortid = require('shortid')
const Url = require('../Models/Url')

module.exports = {
  createShortUrl: async (req, res) => {
    try {
      const { originalUrl } = req.body
      // find one first

      const document = await Url.create({
        original_url: originalUrl,
        short_url: shortid.generate()
      })

      res.status(200).json(document)
    } catch (error) {
      console.error(`error creating new short url ${error}`)
      res.status(400).json({
        error: 'duplicate url already exists'
      })
    }
  },

  getShortUrl: (req, res) => {
    // const { shortId } = req.params
    console.log('run')
    res.json({
      message: 'hello'
    })
  }
}
