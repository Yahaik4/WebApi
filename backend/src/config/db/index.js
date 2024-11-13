const mongoose = require('mongoose')

async function connect(){

    const mongoURI = process.env.MONGO_URI || 'mongodb://mongodb:27017/essay'
    // const mongoURI = 'mongodb://localhost:27017/essay'
    
    try{
        await mongoose.connect(mongoURI)
        console.log("Connect successfully")
    }catch(error){
        console.log("error", error)
    }
}

module.exports = {connect}

