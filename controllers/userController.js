const mongoose = require("mongoose");
const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, name, password } = req.body; // extracting data from req.body

  if (!email || !password) {
    return res.json({ message: "email or password required", success: false }); //checking if email or password is empty or not
  }

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.json({ message: "User already registered", success: false }); //checking email is already registered or not
    }
    const hashPassword = await bcrypt.hash(password, 10); //hashing the password
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
    }); //creating new User in mongodb

    res.json({
      message: "user created successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "error while creating user", success: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "email or password required", success: false }); //checking if email or password is empty or not
  }
  try {
    let existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.json({ message: "User not registered", success: false });
    }

    const isPaswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPaswordCorrect) {
      return res.json({ message: "Wrong credential", success: false });
    }

    const token = jwt.sign({ email: existingUser.email }, "helloworld", {
      expiresIn: "1h",
    });
     
    res.cookie("token",token,{
      httpOnly: true,
      expires: new Date(Date.now()+ 1000*60*60)
    })
    return res.json({
      message: "User Login successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", success: false });
  }
};

const getUsers = async (req, res) => {
  //if user is loggedIn then send the data only

  try {
    const allUsers = await userModel.find({});
    return res.json({ success: true, users: allUsers });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong", success: false });
  }
};

const getCurrentUser= async(req,res)=>{

  try{
    const user= await userModel.findOne({email:req.email});
    res.json({success:true,user:user});

  }catch(error){
    console.log(error);
    res.json({msg:"something went wrong", success:false})
  }
}

const logout=(req,res)=>{
 
  // res.cookie("token", "",{
  //   httpOnly:true,
  //   expires:new Date(0)
  // });

  res.clearCookie("token");
  return res.json({
    message: "User logged out successfully",
    success: true,
  });
};



module.exports = { signup, login, getUsers,getCurrentUser, logout};
