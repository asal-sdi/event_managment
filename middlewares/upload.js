const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {

    const type = req.baseUrl.includes('venue')
      ? 'venue'
      : req.baseUrl.includes('event') 
      ? 'event'
      : 'file';

    const uniqueName =
      type + '-' + Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith('image/')
      ? cb(null, true)
      : cb(new Error('فقط فایل تصویری مجاز است'));
  }
});

module.exports = uploadImage;
