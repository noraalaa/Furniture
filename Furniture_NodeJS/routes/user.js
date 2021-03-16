const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verify = require('./verfiyToken')

router.get('/:code',verify,(req, resp) => {
    const { _id } = req.user;
    User.findOne({ ID: req.params.code }, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            resp.json({
                "Data": null,
                "Message": "Can't get userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": null,
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }
            else {
                if(_id !== data._id){
                        resp.json({
                            "Data": null,
                            "Message": "Access Denied",
                            "Success": false
                        })    
                }
                else{
                resp.json({
                    "Data": data,
                    "Message": "Done get all data",
                    "Success": true
                })
            }
            }
        }
    })
});


router.get('/',verify ,(req, resp) => {
    const { Role } = req.user;
    if (Role !== 'admin') {
        resp.json({
            "Data": null,
            "Message": "Access Denied",
            "Success": false
        })    
    }
    User.find({}, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't get userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Done get all data",
                    "Success": true
                })
            }
        }
    })
});



router.delete('/:code',verify,(req, resp) => {
    const { Role } = req.user;
    if (Role !== 'admin') {
        resp.json({
            "Data": null,
            "Message": "Access Denied",
            "Success": false
        })    
    }
    User.deleteOne({ ID: req.params.code }, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't delete userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }

            else {
                resp.json({
                    "Data": data,
                    "Message": "Done delete  ",
                    "Success": true
                })
            }
        }
    })
});

router.put('/:code',verify ,(req, resp) => {
    User.updateOne({ ID: req.params.code }, req.body, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't update userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }

            else {
                resp.json({
                    "Data": {},
                    "Message": "Number of data update: " + data.nModified,
                    "Success": true
                })
            }
        }
    })
});





module.exports = router