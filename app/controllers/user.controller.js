const { db } = require('../models')
const { user } = require('../models/user.model')
const User = require('../models/user.model')

const { body, validationResult } = require('express-validator');
const { hashSync, genSaltSync, compareSync, genSalt } = require("bcrypt");
const jwt = require('jsonwebtoken')
//const sign = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenSecret = 'mybackendapp'
const genrateToken = require('../routes/user.route')

module.exports = {
    //create users and save users //
    createUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: 0, errors: errors.array() });
        }
        //create user //
        var myData = new User(req.body);
        const salt = genSaltSync(10);
        myData.password = hashSync(myData.password, salt);
        console.log(myData)
        myData.save()
            .then(item => {
                return res.json({
                    status: 200,
                    success: true,
                    data: myData,
                    message: 'user details saved'
                });
            })
            .catch(err => {

                return res.json({
                    status: 400,
                    success: true,
                    data: [],
                    message: err
                });
            });
    },

    // ==login user== //
    loginUser: async (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                console.log(user, "userdb")
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (error, match) => {
                        console.log(error, "error")

                        if (error) {
                            console.log(error, "error")
                            return res.json({
                                status: 500,
                                success: false,
                                message: error
                            });
                        } else if (match == true) {
                            console.log(match, "match")
                            return res.json({
                                status: 200,
                                success: true,
                                token: jwt.sign({ user }, "hfdkjhsdflkksadfkwoqieuo", { expiresIn: "1h" }),
                                message: 'user token details'
                            });
                        }

                    })
                } else {
                    console.log(user, "!user")
                    return res.json({
                        status: 400,
                        success: false,
                        message: 'user does not exist'
                    });
                }

            })
        // .catch(err => {
        //     return res.json({
        //         status: 500,
        //         success: false,
        //         message: err
        //     });
        // });

    },

}
