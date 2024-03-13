const express = require('express');
const path = require('path');

const app = express();
const port = 8000;


const connectDB = require("./db/dbConnection");
const User = require('./db/user');

app.set('view engine','ejs');

//middleware to parse json data
app.use(express.json());

// middleware to serve html as well as css file
app.use(express.static(path.join(__dirname,"..","views")))

//middleware to get data from html post form
app.use(express.urlencoded({extended : true}));

// Set EJS as templating engine 


app.get('/signup',async(req,res)=>{
    res.render("signup");
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
    res.render("login");
})

app.post('/login',async(req,res)=>{
    try{    
        const {username,password} = req.body;
        const user = await User.findOne({username});
        console.log(req.body);
        console.log(user);
        if(!user){
            res.render("login",{error : "User not found"});
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