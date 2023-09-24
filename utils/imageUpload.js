const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cd) => {
		cd(null, './public/upload')
	},
	filename: (req, file, cd) => {
		const [name, ext] = file.originalname.split('.');
		cd(null, `${name}-${Date.now()}.${ext}`);
	}
});

const imageUpload = multer({ 
	storage: storage,
	limits: { fileSize: 1000000 } 
});

module.exports = imageUpload;