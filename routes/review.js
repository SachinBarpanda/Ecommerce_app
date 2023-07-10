const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();
const {validateReview} = require('../middleware');

router.post('/products/:id/review', validateReview ,async(req,res)=>{
    try{
        let {id} = req.params;
        let {rating,comment} = req.body;
        let product = await Product.findById(id);
        const review = new Review({rating,comment});
    
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success','review added succesfully');
        res.redirect(`/products/${id}`);
    }catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

module.exports = router;