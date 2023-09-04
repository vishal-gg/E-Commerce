const express = require('express')
const router = express.Router()
const {addToCart, getCartItems, updateProductQuantity, syncCart, removeFromCart} = require('../controllers/cart')

router.post('/add-to-cart', addToCart);

router.get('/my-cart/:userId', getCartItems);

router.put('/update-cart-quantity', updateProductQuantity)

router.post('/sync-cart', syncCart);

router.post('/remove-cart-item', removeFromCart);
  

module.exports = router;