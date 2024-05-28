const mongoose = require('mongoose');
const Cliente = require('./cliente');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    resetToken: String,
    resetTokenExpiration: Date
});

const User = mongoose.model("User", userSchema);

module.exports = User;
