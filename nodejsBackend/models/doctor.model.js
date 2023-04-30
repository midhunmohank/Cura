const mongoose = require('mongoose');
const Rating = require('../models/ratings.model');


const doctors = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    full_name: { type: String },
    email: { type: String, required: true },
    contact_number: { type: String, required: true },
    education: { type: String },
    research_work: { type: String },
    experience: { type: String },
    image: { type: String },
    _hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false
    },
    _user_credential_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredential',
        required: false
    },
    specialization: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorSpecialization',
    }],
});


module.exports = mongoose.model('Doctor', doctors);