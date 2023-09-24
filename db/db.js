const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/Marketplace';

const connectdb = () => {
	mongoose.connect(dbURI, { useNewUrlParser: true });
	const db = mongoose.connection;

	db.once('open', () => {
		console.log('Connected to the database');
	});
	db.on('error', err => console.log('Error ' + err));
};

module.exports = connectdb;