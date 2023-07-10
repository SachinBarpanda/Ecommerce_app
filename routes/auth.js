const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router()

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

//actually want to register a user in my db
router.post('/register', async (req,res)=>{
    
    
    // res.redirect('/login');
    try {
        let{email,password,username,role} =  req.body;
        const user = new User({email,username,role});
        const newUser = await User.register(user,password);
        req.login(newUser , function(err){
            if(err){
                req.flash('error',err);
                return next(err);
            }
            else{
                req.flash('success','welcome');
                return res.redirect('/products');
            }
        })
    } catch (error) {
        req.flash('error',error.message);
        res.redirect('/register');
    }
})


// to get login form
router.get('/login', (req,res)=>{
    res.render('auth/login');
})

// to actually login via the db
router.post('/login',
passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
(req,res)=>{
    console.log(req.user);
    req.flash('success','Welcome back');
    res.redirect('/products');

})

// logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success','GoodBye friends');
    res.redirect('/login');
})


module.exports = router;









