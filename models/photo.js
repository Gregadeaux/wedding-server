const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const photoSchema = new Schema({
	fileName: String,
	url: String,
	title: String,
	user: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

module.exports = mongoose.model('photo', photoSchema)