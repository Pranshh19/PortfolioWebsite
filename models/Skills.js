const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: String,
    icon: String,
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
