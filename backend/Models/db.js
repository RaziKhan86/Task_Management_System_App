const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URL;

mongoose.connect(DB_URL)
    .then(()=>{
        console.log("DB is Connected..");
    }).catch((err)=>{
        console.log("Db is not connected..",err);
    })