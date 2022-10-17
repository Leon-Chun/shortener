const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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

//shorten url and render success page
app.post('/shortener/create',(req,res) => {
  const originUrl = req.body.originurl
  console.log(checkURL(originUrl))
  
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

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
