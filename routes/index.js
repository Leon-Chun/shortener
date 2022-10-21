const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const shortenr = require('./modules/shortenr')

router.use('/',home)
router.use('/leon_shortener',shortenr)

module.exports = router