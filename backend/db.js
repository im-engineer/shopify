import mongoose from 'mongoose';

var config = require('./config/config');

var configdata = config.get(process.env.Node_env).db;
import 'dotenv/config'
console.log(process.env)
var mongoUrl = `mongodb://siddhantsingh:siddhantsingh87@${configdata.host}:${configdata.port}/${configdata.databaseName}`;

console.log(mongoUrl);

var options= {
    user:configdata.userName,
    pass:configdata.password
}

export const mongoconnection = async() => {
    try{
        await mongoose.connect(mongoUrl);
        console.log("Connect to DB");
    }
    catch(e){
        console.log(e);
        throw e
}
}