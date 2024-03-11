const mongoose = require('mongoose');
// defining types and format of data to be stored
const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type:String,
        required : true,
    }
});

// make userSchema schema in User collection

const User = mongoose.model('User',UserSchema);

module.exports = User;