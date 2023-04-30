const mongoose = require('mongoose');

const leaves = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    // _user_credential_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserCredential',
    //     required: false
    // },
    _doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },
    _patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false
    },
    status: { type: String, enum: ['pending', 'approved','rejected'], default: 'pending', required: true },
    leave_start_date: { type: Date},
    leave_end_date: { type: Date},
    duration: { type: String},
    reason: { type: String},
    
});


module.exports = mongoose.model('Leave', leaves);