require("dotenv").config(); // This should be at the top of your file

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL;
// const mongoURI =
//   "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

//function to connect to database
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongoose successfully");
  });
};

module.exports = connectToMongo; // export to index.js
