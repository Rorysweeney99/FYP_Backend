require('./config/db');

const app = require('express')();
const port = 3000;

const UserRouter = require('./API/LearnerDriver');
const DrivingInstructorRouter = require('./API/DrivingInstructor');
const CountyRouter = require('./API/County');

// For accepting data in post form
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/learnerdriver', UserRouter);
app.use('/drivinginstructor', DrivingInstructorRouter);
app.use('/county', CountyRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})