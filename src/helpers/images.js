const path = require('path');
const multer = require('multer');
const jimp = require('jimp');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

function uploadImage(req, res, next) {
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
  }).single('image');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({
        message: 'File size should be up to 2 MB',
      });
    }
    next();
  });
}

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
