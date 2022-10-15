const express = require('express')
const PORT = 3000

const app = express()

// user body get 
app.use(express.urlencoded({ extended: true }))

//router setting
app.get('/', (req, res) => {
  res.send('This is my test page for initialization')
})

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
