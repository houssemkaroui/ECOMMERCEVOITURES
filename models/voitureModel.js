
const mongoose = require('mongoose');
const voitureSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    photo: {
        type: String,
        default: 'default.jpg',
        required: true

    },
    description: {
        type: String,
        required: true

    },

    createdAt: {
        type: Date,
        default: new Date()

    },

    // userId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
});


// voitureSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'User',
//         select: 'name'
//     });
//     next();
// });

const Voiture = mongoose.model('Voiture', voitureSchema);
module.exports = Voiture;

