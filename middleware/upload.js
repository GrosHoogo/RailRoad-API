const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg or png)'));
    }
    cb(undefined, true);
  }
});

module.exports = upload;
