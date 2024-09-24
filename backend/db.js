require("dotenv").config(); // This should be at the top of your file

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL;

//function to connect to database
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongoose successfully");
  });
};

module.exports = connectToMongo; // export to index.js
