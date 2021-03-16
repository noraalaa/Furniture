const express = require("express");
const router = express.Router();
const Furniturer = require("../models/furniture");
const {verify} = require('./verfiyToken')


//get number of product
router.get('/count', (req, resp) => {
    Furniturer.estimatedDocumentCount({}, function (err, count) {
        if (err) {
            resp.json({
                "Data": [],
                "Message": "Can't get number of product from database,  " + err,
                "Success": false
            })
        }
        else {
            if (count.length == 0) {
                resp.json({
                    "Data": {},
                    "Message": "No Data found in DB",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": count,
                    "Message": "Number of all Product:" + count,
                    "Success": true
                })
            }
        }
    });
});

// get part of product 
router.get('/part/:skip', async (req, resp) => {

    var x = await Furniturer.estimatedDocumentCount({}, function (err, count) { });

    Furniturer.find({}, { __v: 0 }).sort({ _id: -1 }).skip(+req.params.skip).limit(10).exec((err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't get product from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data.length == 0) {
                resp.json({
                    "Data": {},
                    "Message": "No Data found in DB",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Number of all Product:" + x,
                    "Success": true
                })
            }
        }
    })
});

// search for product by word in Name and sort it by price
router.get('/search', (req, resp) => {
    var word = req.query.Sword;
    var criteria = { $regex: word, $options: 'i' };
    var searchByPrice
    if (req.query.Ssort == 0) {
        searchByPrice = 0;
    }
    else {
        searchByPrice = { Price: req.query.Ssort }
    }

    Furniturer.find({ Name: criteria }, { _id: 0, __v: 0 }, { sort: searchByPrice }, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't get product from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data.length == 0) {
                resp.json({
                    "Data": [],
                    "Message": "No Result Found",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Done get all products",
                    "Success": true
                })
            }
        }
    })
});

//put new product
router.post('/', verify,verifyRole ,async (req, resp) => {
    const { Role } = req.user;
    if (Role !== 'admin') {
        resp.json({
            "Data": null,
            "Message": "Dening access",
            "Success": false
        })
    }
    else {
        var code = await Furniturer.find({}, { _id: 0, ID: true }, { sort: { ID: -1 } }, (error, data) => { })
        if (code.length == 0) {
            code = 1;
        }
        else {
            var getcode = code[0].ID + 1;
            code = getcode;
        }

        Furniturer.create({
            ID: code,
            Name: req.body.Name,
            Image: req.body.Image,
            Description: req.body.Description,
            Collection: req.body.Collection,
            Price: req.body.Price
        }
            , (err, data) => {
                if (err) {
                    resp.json({
                        "Data": code,
                        "Message": "Can't add product to database,  " + err,
                        "Success": false
                    })
                }
                else {
                    resp.json({
                        "Data": data,
                        "Message": "Done add product ",
                        "Success": true
                    })
                }
            });
    }
});

// get product by its unquie id
router.get('/:ID', (req, resp) => {
    Furniturer.findOne({ ID: req.params.ID }, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            resp.json({
                "Data": null,
                "Message": "Can't get product from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data.length == 0) {
                resp.json({
                    "Data": null,
                    "Message": "Data with that id: " + req.params.ID + " don't exist",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Done get all product",
                    "Success": true
                })
            }
        }
    })
});

// get all product
router.get('/', (req, resp) => {
    Furniturer.find({}, { __v: 0 }, { sort: { _id: -1 } }, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't get product from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data.length == 0) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Done get all products",
                    "Success": true
                })
            }
        }
    })
});

//delete product by its unquie id
router.delete('/:ID', verify, (req, resp) => {
    const { Role } = req.user;
    if (Role !== 'admin') {
        resp.json({
            "Data": null,
            "Message": "Dening access",
            "Success": false
        })
    }
    else {
        Furniturer.deleteOne({ ID: req.params.ID }, (err, data) => {
            if (err) {
                resp.json({
                    "Data": {},
                    "Message": "Can't delete product from database,  " + err,
                    "Success": false
                })
            }
            else {
                if (data.n == 0) {
                    resp.json({
                        "Data": {},
                        "Message": "Data with that id: " + req.params.ID + " don't exist",
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
    }
});

//update product by its unquie id
router.put('/:ID', verify, (req, resp) => {

    const { Role } = req.user.Role;

    if (Role != 'admin') {
        resp.json({
            "Data": null,
            "Message": "Dening access not Admin",
            "Success": false
        })
    }
    else {

        Furniturer.updateOne({ ID: req.params.ID }, req.body, (err, data) => {
            if (err) {
                resp.json({
                    "Data": {},
                    "Message": "Can't update product from database,  " + err,
                    "Success": false
                })
            }
            else {
                if (data.n == 0) {
                    resp.json({
                        "Data": {},
                        "Message": "Data with that id: " + req.params.ID + " don't exist",
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
    }
});







module.exports = router