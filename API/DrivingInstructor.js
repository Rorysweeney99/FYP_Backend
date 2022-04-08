const express = require('express');
const router = express.Router();

// mongodb user model
const DrivingInstructor = require('./../models/DrivingInstructor');

// Password handler
const bcrypt = require('bcrypt');

// Driving Instructor Signup
router.post('/signupdrivinginstructor', (req, res) => {
    let {name, email, adi, location, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if(name == "" || email == "" || adi == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields !!!!"
        })
    }else if (!/^[a-zA-z]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid Name Entered !"
        })
    }else if (!/^[\w-\.]+@([\w-\.]+\.)+[\w-\.]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid Email Entered !"
        })
    }else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Invalid Password Entered !"
        })
    }else{
        // Checking if Driving Instructor already exists
        DrivingInstructor.find({email}).then(result => {
            if(result.length){
                //A Driving Instructor already exists
                res.json({
                    status: "FAILED",
                    message: "Driving Instructor Account ALREADY EXISTS - Use a different email !"
                });
            }else{
                //Try to create new Driving Instructor

                //Password hashing
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newDrivingInstructor = new DrivingInstructor({
                        name,
                        email,
                        adi,
                        location,
                        password: hashedPassword
                    });

                    newDrivingInstructor.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful !",
                            data: result
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "Error occurred while saving user account !"
                        })

                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occurred while hashing password !"
                    })
                })
            })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Error occurred while checking for existing user !!!"
            })
        })
    }
})

// Signin
router.post('/signindrivinginstructor', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if(email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields !!!!"
        })
    }else{
        DrivingInstructor.find({email}).then(data => {
            if(data.length){
                // Driving Instructor exists

                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        res.json({
                            status: "SUCCESS",
                            message: "Signin successful !",
                            data: data
                        })
                    }else{
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered"
                        })
                    }
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords"
                    })
                })
            }else{
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered !"
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "Error occurred while checking if user existed"
            })
        })
    }
})

// Get DrivingIntructors
router.post('/getdrivinginstructors', (req, res) => {
    let {location} = req.body;
        DrivingInstructor.find({location}).then(data => {
            if(data.length){
                res.json({
                    status: "SUCCESS",
                    message: "Driving Instructors Found !!!",
                    data: data
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "No Driving Instructors in your Area !!"
            })
        })
})

module.exports = router;