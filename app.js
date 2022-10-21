//外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000

//自己設定的引入項目
const routes = require('./routes')
require('./config/mongoose')

 //由套件產生者
const app = express()

//handlebars setting 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')   

app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
