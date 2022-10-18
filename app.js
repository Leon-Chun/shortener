const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Shortener = require('./models/shortener')
const PORT = 3000

const app = express()

//handlebars setting 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')   

//database setting
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection    // 取得資料庫連線狀態
db.on('error', () => {                  // 連線異常
  console.log('mongodb error')
})
db.once('open', () => {                // 連線成功
  console.log('mongodb connected')
})

// user body get
app.use(express.urlencoded({ extended: true }))

//router setting
app.get('/', (req, res) => {
  res.render('index')
})

//shorten success page
app.post('/leon_shortener/create',(req,res) => {
  const originUrl = req.body.originurl
  const shortUrl  = generatorText()
  
  Shortener.find({originurl:originUrl})
    .lean()
    .then(data => {
      //搜尋資料庫，是否縮網址已存在，有則給予資料庫內已存在的縮網址。
      if(data.length){
        return Shortener.findOne({ url: originUrl })
          .then(data => res.render('shorten',{shortUrl:data.shorturl}))
          .catch(error => console.log(error))
      }else{
        // 建立新 shor url
        return Shortener.create({ originurl:originUrl,shorturl:shortUrl})
        .then(() => res.render('shorten',{shortUrl}))
        .catch(error => console.log(error))
      }
    })
  
})

//恢復短網址
app.get('/leon_shortener/:shorturl',(req,res) => {
  const shorturl = req.params.shorturl
  Shortener.findOne({shorturl:shorturl})
    .lean()
    .then(data => res.redirect(data.originurl))
})

//判斷url是否合法
function checkURL(URL) {
  const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  const objExp = new RegExp(Expression)
  if (objExp.test(URL) == true) {
    return true
  }else{
    return false
  }
}

//隨機5碼英文數字混合產生器
function generatorText(){
  let collection = []
  let letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowerLetter = letter.toLocaleLowerCase()
  let number = '1234567890'
  collection = (letter+lowerLetter+number).split('')
  
  let randomCombin = ''
  for(let i=0 ; i<5 ; i++){
    randomCombin += collection[Math.floor(Math.random() * collection.length)]
  }

  return randomCombin 
}


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
