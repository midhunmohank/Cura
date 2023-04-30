const mongoose = require('mongoose');

const user_credentials = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    username: { type: String },
    password: { type: String, required: true },
    user_role: { type: String, enum: ['admin', 'staff', 'doctor', 'patient'], default: null, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
    registerd_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('UserCredential', user_credentials);


