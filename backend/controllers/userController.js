const User = require('./../models/User');
const Order = require('./../models/Order');
const { Types } = require('mongoose');
const controller = {}

controller.addToWishlist = (req, res) => {
    try {
        let wishlistProd = req.body
        let id = req.session.user.id
        User.findOneAndUpdate({ _id: id }, { $push: { wishlist: wishlistProd } })
            .then(() => {
                res.status(201).send('Product added to wishlist')
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.removeFromWishlist = (req, res) => {
    try {
        let prodCode = req.body.prodCode
        let id = req.session.user.id
        User.findOneAndUpdate({ _id: id }, { $pull: { wishlist: { prodCode: prodCode } } })
            .then((doc) => {
                console.log(doc.wishlist.length)
                res.status(200).send('Product removed from wishlist')
            })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.addToBag = (req, res) => {
    try {
        let bagProd = req.body
        let id = req.session.user.id
        User.findOne({
            _id: id,
            'bag.prod.prodCode': bagProd.prod.prodCode, 'bag.size': bagProd.size, 'bag.color': bagProd.color
        })
            .then(doc => {
                if (doc) {
                    User.findOneAndUpdate({
                        _id: id,
                        bag: { $elemMatch: { 'prod.prodCode': bagProd.prod.prodCode, 'size': bagProd.size, 'color': bagProd.color } }
                    },
                        { $inc: { 'bag.$.quantity': 1 } })
                        .then(() => {
                            res.status(201).send('Product updates')
                        })
                } else {
                    User.findOneAndUpdate({ _id: id }, { $push: { bag: { ...bagProd, quantity: 1 } } })
                        .then(() => {
                            res.status(201).send('Product added to bag')
                        })
                }
            })

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.decrementBag = (req, res) => {
    try {
        let bagProd = req.body
        let id = req.session.user.id
        User.findOneAndUpdate({
            _id: id,
            bag: { $elemMatch: { 'prod.prodCode': bagProd.prod.prodCode, 'size': bagProd.size, 'color': bagProd.color } }
        }, { $inc: { 'bag.$.quantity': -1 } })
            .then(() => {
                res.status(201).send('Product updates')
            })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.removeFromBag = (req, res) => {
    try {
        let { prod, size, color } = req.body.product
        let prodCode = prod.prodCode
        let id = req.session.user.id
        User.findOneAndUpdate({ _id: id },
            { $pull: { bag: { size: size, color: color, 'prod.prodCode': prodCode } } })
            .then((doc) => {
                res.status(200).send('Product removed from bag')
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.addToWishlistBulk = (req, res) => {
    try {
        let wishProducts = req.body
        console.log(req.session.user)
        let id = req.session.user.id

        User.findOneAndUpdate({ _id: id }, { $set: { wishlist: wishProducts } })
            .then(() => {
                res.status(201).send('wishlist updated')
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.addToBagBulk = (req, res) => {
    try {
        let bagProducts = req.body
        let id = req.session.user.id
        User.findOneAndUpdate({ _id: id }, { $set: { bag: bagProducts } })
            .then(() => {
                res.status(201).send('wishlist updated')
            })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.placeOrder = (req, res) => {
    try {
        let id = req.session.user.id
        let order = req.body
        let orderDoc = new Order(order)
        orderDoc.save()
        .then(() => {
            User.findOneAndUpdate({_id:id}, {$push: {orders: orderDoc._id}})
            .then(() => {
                res.status(201).send(orderDoc)
            })
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.clearBag = (req,res) => {
    try {
        let id = req.session.user.id
        User.findOneAndUpdate({_id:id}, {$set: {bag: []}})
        .then(() => {
            res.status(200).send('bag cleared')
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

controller.getOrders = (req, res) => {
    try {
        let id = req.session.user.id
        User.findOne({_id:id}).populate('orders')
        .then((doc) => {
            res.status(200).send(doc.orders)
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = controller;