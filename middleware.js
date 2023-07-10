
const Product = require('./models/Product');
const {productSchema,reviewSchema} = require('./schema')

const validateProduct = (req,res,next)=>{
    let {name,img,price,description} = req.body;
    const {error} = productSchema.validate({name,img,price,description});
    if(error){
        return res.render('error',{err:error.message});
    }
    next();
}

const validateReview = (req,res,next) =>{
    let {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error',{err:error.message});
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login first');
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','No access, please register your role first');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error','You are the not authorized for this')
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async (req,res,next)=>{
    let {id} = req.params;//product ki id
    let product = await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('error','You are the not authorized for this')
        return res.redirect('/products');
    }
    next();
}



module.exports = {isProductAuthor , isSeller, isLoggedIn ,validateProduct,validateReview};






