const express = require('express');
const fileController = require('../controller/fileController');
const voitureController = require('../controller/voitureController');
const authController = require('../controller/authController');

const router = express.Router();


// router
//   .route('/')
//   .post(
//     authController.protect,
//     authController.restrictTo('admin'),
//     fileController.uploadModelImages,
//     voitureController.createVoiture
//   );


router.post('/',
authController.restrictTo('admin'),
fileController.uploadModelPhotoSingle, 
fileController.resizeModelPhoto('Voiture'),
 voitureController.createVoiture);


router.get('/',voitureController.getAll)
module.exports = router;
