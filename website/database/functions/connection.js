import mongoose from 'mongoose';
//const data = require('./database_config.json');


mongoose.Promise = global.Promise;
// mongodb://root:pass12345@localhost:56693/?authSource=admin

// Käyttää annettuja environment varibleja riippuen mistä kontista kutsu tulee.
// Esim. MONGODB_DB on eri Account ja Console konteista.
const mongo_url = 'mongodb://' + process.env.MONGO_ROOT_USERNAME + ':' + process.env.MONGO_ROOT_PASSWORD
                    + '@' + process.env.MONGODB_SERVER + ':' + process.env.MONGO_PORT 
                    + '/' + process.env.MONGODB_DB + '?authSource=admin';

console.log("MongoDB URL: " + mongo_url)
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true}) // kumpikin näistä käyttää mongoDB driverin uusia metologioita. Näitä ei uusissa versioissa tarvitse.
    .then((result) => console.log("Connected to DB successfully!"))
    .catch((err) => console.log(err))

var db_connection = mongoose.connection;

export default db_connection;
