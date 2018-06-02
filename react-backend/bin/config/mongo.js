// MONGODB
var mongoose = require("mongoose");
// format: 'mongodb://<username>:<password>@ds117200.mlab.com:17200/todos'
const url = 'mongodb://localhost:27017/ppsn';
mongoose.connect(url, (err) => {
    console.log("connected to DB");
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = mongoose;
