const { Router } = require('express')
const { getShortUrl, createShortUrl } = require('../controllers')

const router = Router()

router.get('/api/shorturl/:short_url', getShortUrl)
router.post('/api/shorturl/new', createShortUrl)

module.exports = router
