const Voiture = require("../models/voitureModel");
const catchAsync = require("../utils/catchAsync");
//const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");


exports.createVoiture = catchAsync(async (req, res, next) => {
     if(!req.file) {
      return next(new AppError('Ajouter Votre Image', 400));
     }
    if (!req.body) {
        return next(new AppError('Veuillez remplir votre formulaire!', 400));
      }
    if (req.file) req.body.photo = req.file.filename;
  const newVoiture = await Voiture.create(req.body);
  res.status(201).json({
    status: "Validé",
    Voiture: newVoiture,
  });
});


exports.getAll = catchAsync(async (req, res, next) => {

  const liste = await Voiture.find({})
  if (!liste) {
    return next(AppError("il y pas des Voiture"))
  }
  res.status(200).send({
    data: liste
  })
})