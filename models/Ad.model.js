const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
	title: { type: String, require: true, minLength: 10, maxLength: 50 },
	description: { type: String },
	date: { type: Date },
	image: { type: String },
	price: { type: Number },
	localization: { type: String },
	seller: { type: String},
});

module.exports = mongoose.model('Ad', adSchema); 