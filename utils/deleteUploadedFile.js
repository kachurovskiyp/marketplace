const fs = require('fs');
const path = require('path');

const deleteUploadedFile = (filename) => {
	if(filename) fs.unlinkSync((path.join(process.cwd() + '/public/upload/' + filename)));
};

module.exports = deleteUploadedFile;