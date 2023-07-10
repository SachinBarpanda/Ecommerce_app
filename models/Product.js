const mongoose = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim : true,
        required : true
    },
    img: {
        type:String,
        trim:true,
        // default:,
    },
    price:{
        type:Number,
        // min:0,
        required:true
    } ,
    description: {
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// middleware which runs in behind and it have pre and post which runs 
// before and after the model that is a js class/

productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}});
    }
})

let Product = mongoose.model('Product', productSchema);
module.exports = Product;



