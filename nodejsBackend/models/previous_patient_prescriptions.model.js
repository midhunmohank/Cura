const mongoose = require('mongoose');

const previous_patient_prescriptions = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false
    },
    prescription: { type: String},
    document: { type: String},
    uploaded_on: { type: Date, default: Date.now},
});


module.exports = mongoose.model('PreviousPatientPrescription', previous_patient_prescriptions);