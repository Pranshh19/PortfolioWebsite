const mongoose = require('mongoose');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
