const { Schema, model } = require('mongoose')

const urlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
    unique: true
  },
  short_url: {
    type: String,
    required: true,
    unique: true
  }
})

const Url = model('Url', urlSchema)

module.exports = Url
