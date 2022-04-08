const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LearnerDriverSchema = new Schema ({
    name: String,
    email: String,
    location: Object,
    password: String,
});

const LearnerDriver = mongoose.model('LearnerDriver', LearnerDriverSchema);

module.exports = LearnerDriver;