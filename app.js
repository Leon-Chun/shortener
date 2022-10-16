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

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
