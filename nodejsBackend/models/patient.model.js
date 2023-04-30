const mongoose = require('mongoose');

const patients = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String},
    contact_number: { type: String},
    gender: { type: String},
    age: { type: String},
    address: { type: String},
    _user_credential_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredential',
        required: false
    },
    health_history_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientHealthHistory"
    }
});


module.exports = mongoose.model('Patient', patients);