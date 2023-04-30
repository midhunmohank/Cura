const mongoose = require('mongoose');

const patient_health_histories = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false
    },
    health_description: { type: String},
    document: { type: String},
    uploaded_on: { type: Date, default: Date.now },
});


module.exports = mongoose.model('PatientHealthHistory', patient_health_histories);