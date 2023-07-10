const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name:"Iphone 14 pro",
        img : "https://plus.unsplash.com/premium_photo-1681333061107-1322a8d6b570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
        price : 13000,
        description:"Mehenga phone"
    },
    {
        name : "Macbook m2 pro",
        img : "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFjfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
        price: 250000,
        description:"costly jabardasti ka"
    },
    {
        name:"Iwatch",
        img :"https://images.unsplash.com/photo-1529498933046-3b8c8c19407d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2glMjBhcHBsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
        price : 25000,
        description: "Ghanta "
    },
    {
        name:"Ipad Pro",
        img:"https://images.unsplash.com/photo-1587033411391-5d9e51cce126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
        price : 45000,
        description:"Thik hai ek prakar"
    },
    {
        name:"Airpods",
        img:"https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
        price : 25000,
        description:"IEM lele "
        
    }
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("Data seeded successfully");
}
 
module.exports = seedDB;






