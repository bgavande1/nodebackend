
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    //name: String,
    firstName: String,
    lastName: String,

    email: {
        type: String,
        lowercase: true,
        required: [true, 'Please enter Email Address'],
        unique: true,
        dropDups: true
    },
    //profile_pic: String,
    address: String,
    city: String,
    state: String,
    mobile: Number,
    //status: Number,
    password: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema)

