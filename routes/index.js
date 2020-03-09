const express = require('express')
const controller = require('../controllers')

const router = express.Router()

router.get('/:short_id', controller.getShortUrl)
router.post('/new', controller.createShortUrl)

module.exports = router
