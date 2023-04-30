const mongoose = require('mongoose');

const ratings = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false
    },
    _doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },

    ratings: { type: String },
    review_added_on: { type: Date, default: Date.now },
   
});


module.exports = mongoose.model('Rating', ratings);