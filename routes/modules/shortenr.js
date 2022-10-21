const express = require('express')
const router = express.Router()
const Shortener = require('../../models/shortener')
const generatorText = require('../../generatorText')


//shorten success page
router.post('/create', (req, res) => {
  const originUrl = req.body.originurl
  const shortUrl = generatorText()

  Shortener.find({ originurl: originUrl })
    .lean()
    .then(data => {
      //搜尋資料庫，是否縮網址已存在，有則給予資料庫內已存在的縮網址。
      if (data.length) {
        Shortener.findOne({ originurl: originUrl })
          .then(data => res.render('shorten', { shortUrl: data.shorturl }))
          .catch(error => console.log(error))

      } else {
        // 建立新 short url
        Shortener.create({ originurl: originUrl, shorturl: shortUrl })
          .then(() => res.render('shorten', { shortUrl }))
          .catch(error => console.log(error))
      }
    })

})

//將短網址導向原網址。
router.get('/:shorturl', (req, res) => {
  const shorturl = req.params.shorturl
  Shortener.findOne({ shorturl: shorturl })
    .lean()
    .then(data => res.redirect(data.originurl))
})

module.exports = router