const mongoose = require('mongoose');
require('dotenv').config();
const contactSchema = new mongoose.Schema({
    name:String,
    email: String,
    contact: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
