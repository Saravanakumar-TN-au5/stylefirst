const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const user = new Schema({
    fullname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    address : {
        address1 : {
            type: String,
            required: true
        },
        address2 : {
            type: String,
            default: ''
        },
        city : {
            type: String,
            required: true
        },
        state : {
            type: String,
            required: true
        },
        country : {
            type: String,
            required: true
        }
    },
    password : {
        type: String,
        required: true
    }
});

user.pre('save', function (next){
    let doc = this
    let pwd = doc.password;
    bcrypt.hash(pwd, 8, function (err, hash) {
        if (err) return err;
        doc.password = hash
        next();
    })
})

const User = mongoose.model('User', user);
module.exports = User;