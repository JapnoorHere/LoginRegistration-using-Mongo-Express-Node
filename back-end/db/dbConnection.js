const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1/mydatabase");
        console.log("Connected to Mongo DB");
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = connectDB;