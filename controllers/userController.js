const mongoose=require("mongoose");
const userModel=require("../models/userSchema");
const bcrypt=require("bcrypt");


const signup=async(req,res)=>{
  const {email,name,password}= req.body;

  if(!email || !password){
    return res.json({message:"email or password required",success:false});
  };
 
  try{
    const existingUser= await userModel.findOne({email:email});
    if(existingUser){
      return res.json({message:"User already registered",success:false})
    }
    
    const hashPassword= await bcrypt.hash(password,10);
    
    const newUser= await userModel.create({name:name,email:email,password:hashPassword});
  
     res.json({message:"user created successfully",user:newUser,success:true})
  }catch(error){   
    console.log(error);
    res.json({message:"error while creating user",success:false})

  }  

}



module.exports={signup};
