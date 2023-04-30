const mongoose = require('mongoose');

const doctor_schedules = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },
    day: { type: String },
    timing: { type: String },
});


module.exports = mongoose.model('DoctorSchedule', doctor_schedules);