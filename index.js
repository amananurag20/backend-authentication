const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const userModel = require("./models/userSchema");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:YlnMdLa8jS8FTqJw@cluster0.oib3vus.mongodb.net/mernAuth"
    );
    console.log("mongodb Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();
const SECRET_KEY = "helloworld";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const token = jwt.sign(
    { name: "Aman Anurag", email: "amananurag@gmail.com" },
    SECRET_KEY,
    {
      expiresIn: "30s",
    }
  );
  console.log(token);
  res.json({ message: "working correctly", token: token });
});

app.get("/verify", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const tokenData = jwt.verify(token, SECRET_KEY);
    console.log(tokenData);
    res.json({ tokenData });
  } catch(error) {
    res.json({ message: "Invalid token" });
  }
});

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  let hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "user Created successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "something went wrong", success: false });
  }
});

app.put("/user", async (req, res) => {
  // const {name,email}= req.body;
  try {
    const updatedUser = await userModel.updateMany(
      { name: "pqr" },
      {
        name: "catttttttt",
      },
      { new: true, runValidators: true }
    );

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", success: false });
  }
});

app.listen(5000, () => {
  console.log("Server is listinig on port no 5000");
});
