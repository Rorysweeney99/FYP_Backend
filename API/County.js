const express = require('express');
const router = express.Router();

// mongodb LearnerDriver model
const County = require('../models/County');
let counter = 0;

// Add County
router.post('/addcounty', (req, res) => {
    let {name, city} = req.body;
    name = name.trim();
    city = city.trim();

    if(name == "" || city == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields !!!!"
        })
    }else{
        // Checking if County already exists
        County.find({city}).then(result => {
            if(result.length){
                //A County already exists
                res.json({
                    status: "FAILED",
                    message: "County Already Listed!"
                });
            }else{
                const newCounty = new County({
                        name,
                        city,
                });

                newCounty.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "New County added successful !",
                        data: result
                    })
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occurred while saving New County !"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Error occurred while checking for existing County !!!"
            })
        })
    }
})

// Get all Counties
router.get('/getcounties', (req, res) => {
    County.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      })
})

// Get County
router.get('/getcounty', (req, res) => {
    let {name, city} = req.body;

    if(name == "" || city == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields !!!!"
        })
    }else{
        County.find({name}).then(data => {
            if(data.length){
                County.find({city}).then(data2 => {
                    if(data.length){
                        res.json({
                            status: "SUCCESS",
                            message: "County Found !!!",
                            data: data2
                        })
                    }
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Couldn't find location !!"
                    })
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "Couldn't find location !!"
            })
        })
    }
})

module.exports = router;