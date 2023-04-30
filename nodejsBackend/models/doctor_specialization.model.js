const mongoose = require('mongoose');

const doctor_specializations = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },
    specialization: { type: String },
});


module.exports = mongoose.model('DoctorSpecialization', doctor_specializations);