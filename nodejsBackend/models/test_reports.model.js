const mongoose = require('mongoose');

const test_reports = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: false
    },
    sample: { type: String},
    test_description: { type: String},
    test_result: { type: String, default: "NULL"},
    amount: { type: String},
    is_amount_paid: { type: String, default: "No"},
    _test_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: false
    },
    status: { type: String},
    tested_on: { type: Date, default: Date.now},
});


module.exports = mongoose.model('TestReport', test_reports);