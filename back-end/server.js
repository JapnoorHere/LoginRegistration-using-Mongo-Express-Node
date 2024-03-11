const express = require('express');
const app = express();
const port = 8000;


const connectDB = require("./db/dbConnection");
const User = require('./db/user');

//middleware to parse json data
app.use(express.json());

app.post('/register',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = new User({username,password});
        await user.save();
        res.status(201).json({message : "Registration done"});
    }
    catch{
        res.status(500).json({error : "Registration failed"});
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            res.status(401).json({error : "User not found"});
        }
        else if(user.password !== password){
            res.status(401).json({error : "Wrong password"});
        }
        else{
            res.status(201).json({error : "Login Successful"});
        }
    }
    catch{
        res.status(500).json({error : "Login failed"});
    }
})


//*Database connection
connectDB();

app.listen(port,()=>{
    console.log("Server listening");
})