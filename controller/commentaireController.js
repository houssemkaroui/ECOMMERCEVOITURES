const Commentaire = require("../models/commentaireModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");


exports.ajouterCommenatire = catchAsync(async (req, res, next) => {
    if (!req.body) {
        return next(new AppError('Veuillez remplir votre donnes!', 400));
      }
  req.body.userId = req.user.id
  const newCommentaire = await Commentaire.create(req.body);
  res.status(201).json({
    status: "Validé",
    Voiture: newCommentaire,
  });
});


exports.getCommentaireByVoiture = catchAsync(async (req, res, next) => {

  const liste = await Commentaire.find({voitureId:req.params.voitureId}).populate({
    path: 'userId',
    select: 'name'
  })
  if (!liste) {
    return next(AppError("il y pas des Voiture"))
  }
  res.status(200).send({
    data: liste
  })
})