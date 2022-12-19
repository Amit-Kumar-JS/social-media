const mongoose = require('mongoose');

exports.connectDatabase = () =>{
    mongoose.connect(process.env.MONGO_URI).then((con)=>{
        `Database Connected: ${con.connection.host}`
    }).catch((err)=>{console.log(err);})
}