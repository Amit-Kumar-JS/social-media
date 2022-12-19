const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please enter your name'],
    },

    email:{
        type:String,
        required:[true,'Please enter your email id'],
        unique:[true,'email already exists'],
    },

    password:{
        type:String,
        required:[true,"Please enter you password"],
        minlength:[6, "Password must be atleast 6 characters"],
        select:false,
    },

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        },

    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    avatar:{
        public_id:string ,
        url:String,
    } ,
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
});

module.exports = mongoose.model('User',userSchema)