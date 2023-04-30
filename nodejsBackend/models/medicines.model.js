const mongoose = require('mongoose');

const medicines = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: false
    },
    company_name: { type: String },
    name: { type: String },
    type: { type: String },
    description: { type: String },
    price: { type: String },
    quantity: { type: String },
    re_stock_level: { type: String },
    is_available: { type: String },
    added_on: { type: Date, default: Date.now},
});


module.exports = mongoose.model('Medicine', medicines);