const express = require('express');
const path = require('path');

const app = express();
const port = 8000;


const connectDB = require("./db/dbConnection");
const User = require('./db/user');


//middleware to parse json data
app.use(express.json());

// middleware to serve html as well as css file
app.use(express.static(path.join(__dirname, "..", "views")))

//middleware to get data from html post form
app.use(express.urlencoded({ extended: true }));


app.get('/signup', async (req, res) => {
    res.render("signup.pug");
})

app.post('/signup', async (req, res) => {
    // console.log(req.body);
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        console.log(user);
        await user.save();
        res.render('signup.pug',{err : "Signup Successful"});
    }
    catch (error){
        console.log(error);
        res.render('signup.pug',{err : "Signup Failed"});
    }
});

app.get('/login', (req, res) => {
    res.render("login.pug");
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(req.body);
        console.log(user);
        if (!user) {
            res.render("login.pug", { error: "User not found" });
        }
        else if (user.password !== password) {
            res.render("login.pug", { error: "Wrong password" });
        }
        else {
            res.render("login.pug", { error: "Login Successful" });

        }
    }
    catch {
        res.status(500).json({ error: "Login failed" });
    }
})


//*Database connection
connectDB();

app.listen(port, () => {
    console.log("Server listening");
})