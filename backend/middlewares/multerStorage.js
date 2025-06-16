const multer = require('multer');
const articleService = require('../services/articleService');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const key = req.params.key;
    const folderPath = articleService.prepareImageStorage(key);
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

module.exports = multer({ storage });