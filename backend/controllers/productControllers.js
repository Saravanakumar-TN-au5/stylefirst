const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('./../models/Product');
const Variant = require('./../models/Variant');
const controller = {}

controller.getProducts = (req, res) => {
    try {
        let path = `/${req.params.for}/${req.params.type}`
        Product.find({path}).then((doc) => {
            return res.status(200).send(doc)
        })
    } catch (error) {
        res.status(404).send({message: 'Resource not found'})
    }
}

controller.getFilters = (req, res) => {
    try {
        let path = `/${req.params.for}/${req.params.type}`
        let regex = new RegExp(`\/${req.params.for}\/${req.params.type}`)
        let filters = {category:[],size:[],material:[],color:[]}
        Product.find({path})
        .then((doc) => {
            doc.forEach((item) => {
                !filters.category.includes(item.category) ? filters.category.push(item.category): null
            })
            doc.forEach((item) => {
                !filters.material.includes(item.material) ? filters.material.push(item.material): null
            })
        })
        .then(() => {
            Variant.find({path: {$regex: regex}})
            .then((doc) => {
                doc.forEach((item) => {
                    !filters.size.includes(item.size) ? filters.size.push(item.size): null
                })
                filters.size.sort((a,b)=>a-b)
                doc.forEach((item) => {
                    !filters.color.includes(item.color) ? filters.color.push(item.color): null
                })
                return res.status(200).send(filters)
            })
        })
    } catch (error) {
        res.status(404).send({message: 'Resource not found'})
    }
}

controller.getFilteredProds = (req,res) => {
    try {
        let path = `/${req.params.for}/${req.params.type}`
        let { category, size, material, color} = req.query
        let prodFil = {}
        prodFil.path = path
        category ? prodFil.category = {$in: category.split(',')} : null
        material ? prodFil.material =  {$in: material.split(',')}: null
        size || color ? prodFil.variants = {$elemMatch:{}} : null
        size ? prodFil.variants.$elemMatch.size = {$in: size.split(',')} : null
        color ? prodFil.variants.$elemMatch.color = {$in: color.split(',')} : null
        Product.find(prodFil)
        .then((doc) => {
            return res.status(200).send(doc)
        })
    } catch (error) {
        return res.status(404).send({message: 'Resource not found'})
    }
}

controller.getProduct = (req, res) => {
    try {
        let id = req.params.id;
        let checkId = ObjectId.isValid(id);
        let query = checkId ? {_id: id} : {prodCode: id}
        Product.find(query).populate('variants.varId')
        .then((doc) => {
            return res.status(200).send(doc)
        })
    } catch (error) {
        return res.status(404).send({message: 'Resource not found'})
    }
}

controller.getProductBulk = (req, res) => {
    try {
        let arr = JSON.parse(req.params.prodArr);
        Product.find({prodCode: {$in: arr}})
        .then((doc) => {
            return res.status(200).send(doc)
        })
    } catch (error) {
        return res.status(404).send({message: 'Resource not found'})
    }
}

module.exports = controller;