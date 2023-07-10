const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router() //mini instance
const {isProductAuthor , validateProduct, isLoggedIn, isSeller} = require('../middleware');

//to show all the products

router.get('/products', async (req, res) => {
    try {
        let products = await Product.find({})
        res.render('products/index', { products });
    } catch (e) {
        res.status(500).render('error', {err:e.message});
    }

})

// to show the form for the new product
router.get('/product/new', isLoggedIn ,(req, res) => {
    try {
        res.render('products/new');
    } catch(e) {
        res.status(500).render('error', {err:e.message});
    }
})

// to actually add the product in db
router.post('/products', isLoggedIn , validateProduct , isSeller, async (req, res) => {
    try {
        let { name, img, price, description } = req.body;
        await Product.create({ name, img, price, description , author:req.user });
        req.flash('success','Product added succesfully');
        res.redirect('/products')
    } catch(e) {
        res.status(500).render('error', {err:e.message});
    }
})

// to show a particular product
router.get('/products/:id',isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg:req.flash('msg') });
    } catch (e) {
        res.status(500).render('error', {err:e.message});
    }
})

// form to edit the products
router.get('/products/:id/edit',isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct })
    } catch (e) {
        res.status(500).render('error', {err:e.message});
    }
})

// to actually edit the data in db
router.patch('/products/:id',isLoggedIn, validateProduct , async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, description } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, description })
        req.flash('success','Product edited succesfully');
        res.redirect(`/products/${id}`);
    } catch (e) {
        res.status(500).render('error', {err:e.message});
    }
})
// to delete a product
router.delete('/products/:id',isLoggedIn, isProductAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findById(id);

        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }

        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted succesfully');
        res.redirect('/products');
    } catch (e) {
        res.status(500).render('error', {err:e.message});
    }
})


module.exports = router;
