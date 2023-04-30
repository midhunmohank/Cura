const mongoose = require('mongoose');

const appointments = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    name: { type: String},
    email: { type: String},
    contact: { type: String},

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
    status: { type: String, enum: ['pending', 'approved','cancel','rescheduled'], default: 'pending', required: true },
    appointment_date: { type: String},
    appointment_time: { type: String},

});


module.exports = mongoose.model('Appointment', appointments);