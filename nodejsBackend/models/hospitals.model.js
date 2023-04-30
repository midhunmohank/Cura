const mongoose = require('mongoose');

const hospitals = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    name: { type: String },
    location: { type: String },
    image: { type: String },
    email: { type: String },
    contact_number: { type: String},
});


module.exports = mongoose.model('Hospital', hospitals);