const { check } = require('express-validator');

exports.signupValidation = [
    //check('name', 'Name is requied').not().isEmpty(),
    check('firstName', 'firstName is requied').not().isEmpty(),
    check('lastName', 'lastName is requied').not().isEmpty(),
    check('address', 'address is requied').not().isEmpty(),
    check('city', 'city is requied').not().isEmpty(),
    check('mobile', 'mobile is requied').not().isEmpty(),
    //check('profile_pic', 'profile_pic is requied').not().isEmpty(),
    // check('status', 'status is requied').not().isEmpty(),
    check('email', 'email is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })

]