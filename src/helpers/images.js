const path = require('path');
const multer = require('multer');
const jimp = require('jimp');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const upload = multer({
  dest: path.join(__dirname, '../..', 'uploads'),
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(new Error('Wrong file format'), false);
  },
});

const uploadImage = upload.single('image');

const resizeImage = pathFile =>
  jimp.read(pathFile).then(img => img.quality(60).writeAsync(pathFile));

const uploadCloud = pathFile => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      pathFile,
      { folder: 'CSPW' },
      async (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      },
    );
  });
};

module.exports = { uploadImage, resizeImage, uploadCloud };
