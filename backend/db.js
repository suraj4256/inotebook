const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async()=>{
    try{
     await mongoose.connect(mongoURI);
     console.log("Connected Successfully");
    }catch(err){
        console.log("Failed to connect",err);
    }
}

module.exports = connectToMongo;