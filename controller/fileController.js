const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  // console.log("multer");
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else if (file.mimetype.startsWith('application')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Pas une image, veuillez télécharger uniquement des images',
        400
      ),
      false
    );
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadModelPhotoSingle = upload.single('photo');
exports.uploadModelImages = upload.fields([
  { name: 'photo', maxCount: 1 },

]);

exports.resizeModelPhoto = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log('user',req.user);
    if (!req.file) return next();
    req.file.filename = `${Model}-${Date.now()}.png`;
    await sharp(req.file.buffer)
      // .resize(480, 640)
      .toFormat('png')
      .png({ quality: 100 })
      .toFile(`public/img/${Model}/${req.file.filename}`);
    next();
  });


exports.resizeModelImages = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1)photo image
    if (req.files.photo) {
      req.body.photo = `${Model}-${Date.now()}-photo.jpeg`;
      await sharp(req.files.photo[0].buffer)
        .resize(480, 640)
        .toFormat('jpeg')
        // .jpeg({ quality: 100 })
        .toFile(`public/img/${Model}/${req.body.photo}`);
    }
    next();
  });
