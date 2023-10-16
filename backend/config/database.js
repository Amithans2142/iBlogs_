const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = ()=> {
    try{

        mongoose.connect(process.env.DATABASE_URL,{
           useNewUrlParser:true,
           useUnifiedTopology:true 
        })
        console.log("Database Connected")
    }catch{
        console.log("Database Error")
    }
}
module.exports=connectToDb;