const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/auth");
const verify = require('./verfiyToken')
//console.log(config.secret)


router.post('/signup', async (req, resp) => {

    var code = await User.find({}, { _id: 0, ID: true }, { sort: { ID: -1 } }, (error, data) => { })
    if (code.length == 0) {
        code = 1;
    }
    else {
        var getcode = code[0].ID + 1;
        code = getcode;
    }

    //accessToken
    const saltRounds = 10;
    bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't add user to database,  " + err,
                "Success": false
            })
        }
        // Store hash in your password DB.
        else {
            User.create({
                ID: code,
                Name: req.body.Name,
                Email: req.body.Email,
                Password: hash,
                Gender: req.body.Gender,
                MilitaryService: req.body.MilitaryService,
                DateOfBirth: req.body.DateOfBirth,
            }
                , async (err, data) => {
                    if (err) {
                        resp.json({
                            "Data": {},
                            "Message": "Can't add user to database,  " + err,
                            "Success": false
                        })
                    }
                    else {
                            //create and assign a token
                            const token = jwt.sign({_id: data._id, Role: data.Role},config.secret,{expiresIn: 86400*100})
                            resp.header('auth-token',token).send(
                                resp.json({
                                    "Data": token,
                                    "Message": "Done Sign up ",
                                    "Success": true
                                }) );
                    }
                });
        }
    });


});

router.get('/signin',verify,(req,resp) =>{
    
        resp.json({
            "Data": {},
            "Message": "verify done",
            "Success": true
        })
});

router.post('/signin', (req, resp) => {
    User.findOne({ Email: req.body.Email }, (err, data) => {

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
                    "Data": {},
                    "Message": "Can't find user with this email "+data,
                    "Success": false
                })
            }
            else {
                // Load hash from your password DB.
                bcrypt.compare(req.body.Password, data.Password, async (err, result) => {
                    if (err) {
                        resp.json({
                            "Data": null,
                            "Message": err,
                            "Success": false
                        })
                    }
                    else {
                        if (result == false) {
                            resp.json({
                                "Data": {},
                                "Message": "Wrong Password",
                                "Success": false
                            })
                        }
                        else {
                            //create and assign a token
                            const token = jwt.sign({_id: data._id, Role: data.Role},config.secret,{expiresIn: 86400*100})
                            resp.header('auth-token',token).send(
                                resp.json({
                                    "Data": token,
                                    "Message": "Done Sign in ",
                                    "Success": true
                                })
                                );
                        }
                    }
                });
            }
        }
    });
});





module.exports = router