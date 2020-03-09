/* eslint-disable camelcase */
/* eslint-disable no-console */

const shortid = require('shortid')
const validUrl = require('valid-url')
const Url = require('../Models/Url')

module.exports = {
  createShortUrl: async (req, res) => {
    try {
      const { originalUrl } = req.body

      if (!validUrl.isUri(originalUrl)) {
        throw new Error(`The given url ${originalUrl} is not a valid uri`)
      }

      // create a shortid
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

  getShortUrl: async (req, res) => {
    try {
      const { short_url } = req.params
      const doc = await Url.findOne({
        short_url
      })

      if (!doc) {
        throw new Error(`Shorturl ${short_url} is not found`)
      }

      const { original_url } = doc

      res.redirect(302, original_url)
    } catch (error) {
      // bad request
      res.status(400).json({
        msg: error.message
      })
    }
  }
}
