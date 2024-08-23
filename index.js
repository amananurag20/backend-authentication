const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const userModel = require("./models/userSchema");
const {signup}= require("./controllers/userController")

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:YlnMdLa8jS8FTqJw@cluster0.oib3vus.mongodb.net/authentication"
    );
    console.log("mongodb Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {  
  res.json({ message: "working correctly"});
});


app.post("/user/signup", signup);


app.listen(5000, () => {
  console.log("Server is listinig on port no 5000");
});
