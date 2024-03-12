const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;


const connectDB = require("./db/dbConnection");
const User = require('./db/user');

const loginFile = fs.readFileSync(path.join(__dirname,"..","front-end","login.html"),"utf-8");
const signupFile = fs.readFileSync(path.join(__dirname,"..","front-end","signup.html"),"utf-8");

//middleware to parse json data
app.use(express.json());

// middleware to serve html as well as css file
app.use(express.static(path.join(__dirname,"..","front-end")))

//middleware to get data from html post form
app.use(express.urlencoded({extended : true}));

app.get('/signup',async(req,res)=>{
    const frontendPath = path.join(__dirname,"..","front-end");
    const filePath = path.join(frontendPath, 'signup.html');
    res.sendFile(filePath);
})

app.post('/signup',async(req,res)=>{
    // console.log(req.body);
    try{
        const {username,password} = req.body;
        const user = new User({username,password});
        await user.save();
        const errorFile = signupFile.replace("{{%ERROR%}}","Registration done");
        res.send(errorFile);
    }
    catch{
        const errorFile = signupFile.replace("{{%ERROR%}}","Registration failed");
        res.send(errorFile);
    }
}); 

app.get('/login',(req,res)=>{
    const frontendPath = path.join(__dirname,"..","front-end");
    const filePath = path.join(frontendPath, 'login.html');
    res.sendFile(filePath);
})

app.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        console.log(req.body);
        console.log(user);
        if(!user){
            console.log("User not found");
        }
        else if(user.password !== password){
            console.log("Wrong password");

        }
        else{
            console.log("Login Successful");
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