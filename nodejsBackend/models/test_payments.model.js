const mongoose = require('mongoose');

const test_payments = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false
    },
    _test_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestReport',
        required: false
    },
    amount: { type: String},
    payment_status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'paid', required: true },
    payment_on: { type: Date, default: Date.now },
});


module.exports = mongoose.model('TestPayment', test_payments);