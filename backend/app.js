const express = require('express');
const app = express();

require('dotenv').config({path: "backend/config/config.env"})

//using middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//importing routes
const post = require("./routes/Post")

//using routes
app.use('/',post)

module.exports = app