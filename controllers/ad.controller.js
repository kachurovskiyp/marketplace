const Ad = require('../models/Ad.model');
const sanitize = require('mongo-sanitize');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
	try {
		const ads = await Ad.find();
		if (!ads) return res.status(404).send({ message: 'Not found' });
		res.json(ads);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

exports.getById = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id);
		if (!ad) return res.status(404).send({ message: 'Not found' });
		res.json(ad);
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

exports.addAd = async (req, res) => {
	try {
		const title = sanitize(req.body.title);
		const { description, date, price, localization, seller } = req.body;

		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
		const image = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType) ? req.file.filename : 'unset';

		if (title && typeof title === 'string') {
			const newAd = new Ad({
				title,
				description,
				date,
				image,
				price,
				localization,
				seller
			});

			await newAd.save();
			res.status(200).send({ message: 'New ad added!' });
		} else {
			return res.status(400).send('Bad request');
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

exports.deleteAd = async (req, res) => {
	try {
		const ad = Ad.findById(req.params.id);
		if (ad) {
			await Ad.deleteOne({ _id: req.params.id });
			res.status(200).send({ message: 'deleted' });
		} else {
			res.status(404).send({ message: 'Not found' });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

exports.changeAd = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id);

		if (ad) {
			const title = sanitize(req.body.title);
			const { description, date, price, localization, seller } = req.body;

			const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
			const image = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType) ? req.file.filename : 'unset';

			const ad = await Ad.findById(req.params.id);
			if(!ad) return res.status(404).send({message: 'Not found'});

			if (title && typeof title === 'string') {
				await Ad.updateOne({ _id: req.params.id }, {
					$set: {
						title,
						description,
						date,
						image,
						price,
						localization,
						seller
					}
				});

				res.status(200).send({ message: 'Ad is changed' });
			} else {
				return res.status(400).send('Bad request');
			}
		} else {
			res.status(404).send({ message: 'Not found' });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

