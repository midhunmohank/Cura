const mongoose = require('mongoose');

const staffs = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    name: { type: String },
    email: { type: String},
    contact_number: { type: String},
    gender: { type: String},
    age: { type: String},
    location: { type: String},
    role: { type: String},
    _user_credential_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredential',
        required: false
    },
});


module.exports = mongoose.model('Staff', staffs);