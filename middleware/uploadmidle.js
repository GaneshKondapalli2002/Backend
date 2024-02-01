const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dbconfig = require('../database');
const mongoose = require('mongoose');

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/userdata',
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-image-${file.originalname}`;
      return { filename };
    }
    return {
      bucketName: dbconfig.imgBucket,
      filename: `${Date.now()}-image-${file.originalname}`,
      _id: new mongoose.Types.ObjectId(),
    };
  },
});

const upload = multer({ storage: storage }).single('file');

const uploadFiles = multer({ storage: storage }).single('file');
const uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
