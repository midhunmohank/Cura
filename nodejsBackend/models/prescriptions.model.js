const mongoose = require('mongoose');

const prescriptions = mongoose.Schema({

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
    _written_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: false
    },
    prescription: { type: String},
    document: { type: String},
    written_on: { type: Date, default: Date.now},
});


module.exports = mongoose.model('Prescription', prescriptions);