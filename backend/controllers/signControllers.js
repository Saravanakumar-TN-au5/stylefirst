const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const controller = {};

controller.register = (req, res) => {
    try {
        let {
            fullname, email, address1, address2, city, state, country, password
        } = req.body;
        let doc = {
            fullname, email, address: { address1, address2, city, state, country }, password
        }
        User.findOne({ email: doc.email }, function (err, user) {
            if (user) {
                return res.status(400).send({ message: 'Email already exists' });}
            else {
                console.log(doc)
                new User(doc).save(function (err) {
                    if (err) throw 'Invalid Data';
                    req.session.user = { id: doc._id };
                    return res.status(201).send({
                        fullname: doc.fullname, email: doc.email, address: doc.address
                    });
                });
            }
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

controller.login = (req, res) => {
    try {
        let { email, password } = req.body;
        User.findOne({ email }, function (err, doc) {
            if (doc) {
                bcrypt.compare(password, doc.password, function (err, result) {
                    if (result) {
                        req.session.user = { id: doc._id }
                        return res.status(200).send({
                            fullname: doc.fullname, email: doc.email, address: doc.address
                        });
                    }
                    return res.status(400).send({ message: 'Invalid Password' });
                })
            } else {
                return res.status(400).send({ message: 'Invalid Email' });
            }
        });
    }
    catch (err) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.logout = (req, res) => {
    try {
        req.session.destroy(function (err) {
            if (!err) return res.status(200).send({ message: 'Success' })
        })
    }
    catch {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = controller;