const express = require('express')
const controller = require('../controllers')

const router = express.Router()

router.get('/api/shorturl/:short_url', controller.getShortUrl)
router.post('/api/shorturl/new', controller.createShortUrl)

module.exports = router
