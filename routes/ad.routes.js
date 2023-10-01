const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const ad = require('../controllers/ad.controller');

router.get('/ads', ad.getAll);
router.get('/ads/:id', ad.getById);
router.post('/ads', imageUpload.single('image'), ad.addAd);
router.delete('/ads/:id', authMiddleware, ad.deleteAd);
router.put('/ads/:id', authMiddleware, imageUpload.single('image'), ad.changeAd);

module.exports = router;