/*  IT 122 - ADV JS - Week4 Assignment
    Database integration
    --install Mongoose
    --Create data model that connects to db, defines data schema, and exports data model for use by other scripts

    Updated By: Mike Gilson
    Updated Date: 07/22/2020
*/


// reference db credentials
//const credentials = require("../credentials");
const user = process.env.MONGO_USERNAME || "dbuser";
const pass = process.env.MONGO_PASSWORD || "dbpassword";
const url = process.env.MONGO_URL || "sccprojects.llt4i.mongodb.net";
let uri = `mongodb+srv://${user}:${pass}@${url}/sccprojectdb?retryWrites=true&w=majority`;

// require mongoose ODM library
const mongoose = require('mongoose');


//connect to db via the credentials info
mongoose.connect(uri, { dbName: "sccprojectdb", useNewUrlParser: true, useUnifiedTopology: true });

// (Week5 - 7/31/2020)
// Required mongodb/mongoose setting for using findOneAndDelete and findOneAndUpdate
mongoose.set('useFindAndModify', false);

// when mongoose connects to mongodb, display confirmation in console
mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

// define movie model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    title: {type: String, required: true},
    dir: String,
    year: Number,
    rating: String
});

module.exports = mongoose.model('Movie', mySchema);

