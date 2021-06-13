const express = require('express');
const commentaireController = require('../controller/commentaireController')
const authController = require('../controller/authController');

const router = express.Router();



router.post('/', authController.protect,
commentaireController.ajouterCommenatire);


router.get('/:voitureId',authController.protect,commentaireController.getCommentaireByVoiture)
module.exports = router;
