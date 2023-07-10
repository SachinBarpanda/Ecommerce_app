const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User')


const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-sam-app')
.then(()=>{console.log("DB connected succesfully")})
.catch((err)=>{
    console.log("DB Error")
    console.log(err)
})

let configSession =  {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookies:{
        httpOnly : true,
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000
    }
  }


app.engine('ejs',ejsMate);
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());//passport ko use karne ke liye
app.use(passport.session());//db mein rakhne ke liye 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// PASSPORT ki local strategy
passport.use(new LocalStrategy(User.authenticate()));


// seeding Database
// seedDB();

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);


app.listen(8080,()=>{
    console.log("server connected at port 8080")
})










