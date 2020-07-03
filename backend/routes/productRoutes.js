const express = require('express');
const router = express.Router();
const {getProducts, getFilters, getFilteredProds, getProduct} = require('./../controllers/productControllers');

router.get('/products/:for/:type', getProducts);
router.get('/getFilters/:for/:type', getFilters);
router.get('/getFilteredProducts/:for/:type', getFilteredProds);
router.get('/getProduct/:id', getProduct);

module.exports = router;