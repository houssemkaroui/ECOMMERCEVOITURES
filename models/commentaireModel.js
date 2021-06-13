
const mongoose = require('mongoose');
const commentaireSchema = new mongoose.Schema({
    commentiare: {
        type: String,
        required:true
    },
  
     userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: ["Chaque commentaire fourni par un user ",true]
    },

    voitureId :{
        type:mongoose.Schema.ObjectId,
        ref:'Voiture',
        required:["Chaque commentaire dider a un Voiture ",true]
    },

    createdAt: {
        type: Date,
        default: new Date()

    },

  
});


// voitureSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'User',
//         select: 'name'
//     });
//     next();
// });

const Commentaire = mongoose.model('Commentaire', commentaireSchema);
module.exports = Commentaire;

