const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrivingInstructorSchema = new Schema ({
    name: String,
    email: String,
    adi: Number,
    location: Object,
    password: String,
});

const DrivingInstructor = mongoose.model('DrivingInstructor', DrivingInstructorSchema);

module.exports = DrivingInstructor;