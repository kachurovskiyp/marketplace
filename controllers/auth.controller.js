const User = require('../models/User.model');
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const deleteUploadedFile = require('../utils/deleteUploadedFile');

exports.register = async (req, res) => {
	try {
		const login = sanitize(req.body.login);
		const password = sanitize(req.body.password);
		const phone = sanitize(req.body.phone);

		if (login && typeof login === 'string' && password && typeof password === 'string') {
			const loginUser = await User.findOne({ login });

			if (loginUser) {
				if(req.file.filename) deleteUploadedFile(req.file.filename);
				return res.status(409).send({ message: 'User with this login already exist' });
			}
			
			const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
			const avatar = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType) ? req.file.filename : 'unset';

			const user = await User.create({ 
				login, 
				password: await bcrypt.hash(password, 10),
				avatar,
				phone
			});
			res.status(201).send({ message: 'User created ' + user.login });

		} else {
			if(req.file.filename) deleteUploadedFile(req.file.filename);
			res.status(400).send({ message: 'Bed request' });
		}

	} catch (err) {
		if(req.file.filename) deleteUploadedFile(req.file.filename);
		res.status(500).send({ message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const login = sanitize(req.body.login);
		const password = sanitize(req.body.password);
		
		if (login && typeof login === 'string' && password && typeof password === 'string') {
			const user = await User.findOne({ login });
			
			if (!user) {
				res.status(400).send({ message: 'Login or password are incorrect' });
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					req.session.authenticated = true;
					req.session.user = { id: user.id, login: user.login };
					res.json(req.session.user);
				} else {
					res.status(400).send({ message: 'Login or password are incorrect' });
				}
			}
		} else {
			res.status(400).send({ message: 'Bad request' });
		}

	} catch(err) {
		res.status(500).send({ message: err.message });
	}
};

exports.getUser = async (req, res) => {
	try {
		if(req.session.authenticated) {
			res.json(req.session);
		} else {
			res.status(404).send({message: 'Session not found'});
		}
		
	} catch(err) {
		res.status(500).send({ message: err.message });
	}
	
};

exports.logout = async (req, res) => {
	try {
		if (req.session) {
			req.session.destroy();
			res.status(200).send({ message: 'Logout success' });
		} else {
			res.status(400).send({ message: 'Session not found' });
		}
	} catch(err) {
		res.status(500).send({ message: err.message });
	}
};