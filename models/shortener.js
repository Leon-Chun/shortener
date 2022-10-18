const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenerSchema = new Schema({ 
  originurl: { type: String, required: true },
  shorturl: { type: String, required: true }
	})

module.exports = mongoose.model('Shortener', shortenerSchema)