const mongoose = require('mongoose');

const payment_card_details = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    _test_payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestPayment',
        required: false
    },
    name_on_card: { type: String},
    card_type: { type: String},
    card_number: { type: String},
    cvv: { type: String},
    expiry_date: { type: String},
});


module.exports = mongoose.model('PaymentCardDetail', payment_card_details);