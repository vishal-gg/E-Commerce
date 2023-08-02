const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.get('/', async (req, res) => {
    try {
       const products = await Product.find({})
       res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(400).json({error: err.message})
    }
})

module.exports = router;