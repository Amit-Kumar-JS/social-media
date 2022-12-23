const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")

require('dotenv').config({path: "backend/config/config.env"})

//using middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//importing routes
const post = require("./routes/Post")
const user = require("./routes/User")

//using routes
app.use('/',post)
app.use('/',user)

module.exports = app