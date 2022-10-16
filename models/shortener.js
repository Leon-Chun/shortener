const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenerSchema = new Schema({ 
  url: { type: String, required: true },
  shortUrl: { type: String, required: true }
	})

module.exports = mongoose.model('shortener', shortenerSchema)