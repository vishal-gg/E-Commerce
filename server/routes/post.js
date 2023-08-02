const express = require('express');
const router = express.Router();
const {upload, uploadToFirebase} = require('../config/firebaseConfig')
const Product = require('../models/products');


router.post('/', upload.single('image'), uploadToFirebase, async (req, res) => {

try {
    const {title, price, description, brand, category, onSale, discount } = req.body;
    
    const dbPayload = {
      title,
      image: req.file.firebaseUrl,
      price,
      description,
      brand,
      category
    }
  
    if(onSale) dbPayload.onSale = onSale;
    if(discount) dbPayload.discount = discount;
  
    const saveProduct = new Product(dbPayload)
    const payload = await saveProduct.save()
    
    res.status(200).json({message: 'upload successfully', payload })

} catch (err) {
  console.log(err)
  res.status(400).json({error: err.message})
}

});

module.exports = router;