const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	login: { type: String, required: true },
	password: { type: String, required: true },
	avatar: { type: String },
	phone: { type: Number }
}, {
	strictPopulate: false
});

module.exports = mongoose.model('User', userSchema);