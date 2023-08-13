const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    websiteLink: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
