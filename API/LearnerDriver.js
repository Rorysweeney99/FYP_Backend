const express = require('express');
const router = express.Router();

// mongodb LearnerDriver model
const LearnerDriver = require('../models/LearnerDriver');

// Password handler
const bcrypt = require('bcrypt');

// Signup
router.post('/signuplearnerdriver', (req, res) => {
    let {name, email, location, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if(name == "" || email == "" || password == ""){
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
        // Checking if LearnerDriver already exists
        LearnerDriver.find({email}).then(result => {
            if(result.length){
                //A LearnerDriver already exists
                res.json({
                    status: "FAILED",
                    message: "LearnerDriver ALREADY EXISTS - Use a different email !"
                });
            }else{
                //Try to create new LearnerDriver

                //Password hashing
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newLearnerDriver = new LearnerDriver({
                        name,
                        email,
                        location,
                        password: hashedPassword
                    });

                    newLearnerDriver.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful !",
                            data: result
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "Error occurred while saving LearnerDriver account !"
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
                message: "Error occurred while checking for existing LearnerDriver !!!"
            })
        })
    }
})

// Signin
router.post('/signinlearnerdriver', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if(email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields !!!!"
        })
    }else{
        LearnerDriver.find({email}).then(data => {
            if(data.length){
                // LearnerDriver exists
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
                message: "Error occurred while checking if LearnerDriver existed"
            })
        })
    }
})

// Get Learner Drivers
router.post('/getlearnerdrivers', (req, res) => {
    let {location} = req.body;
        LearnerDriver.find({location}).then(data => {
            if(data.length){
                res.json({
                    status: "SUCCESS",
                    message: "Learner Drivers Found !!!",
                    data: data
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "No Learner Drivers in your Area !!"
            })
        })
})
module.exports = router;