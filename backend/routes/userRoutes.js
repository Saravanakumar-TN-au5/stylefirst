const express = require('express');
const router = express.Router();
const { 
    addToBag, addToBagBulk, addToWishlist, addToWishlistBulk, getOrders,
    removeFromBag, removeFromWishlist, decrementBag, placeOrder, clearBag
} = require('./../controllers/userController');

router.post('/addToBag', addToBag);
router.post('/addToWishlist', addToWishlist);
router.post('/addToBagBulk', addToBagBulk);
router.post('/addToWishlistBulk', addToWishlistBulk);
router.delete('/removeFromBag', removeFromBag);
router.delete('/removeFromWishlist', removeFromWishlist);
router.post('/decrementBag', decrementBag);
router.post('/placeOrder', placeOrder);
router.delete('/clearBag', clearBag);
router.get('/getOrders', getOrders);

module.exports = router;