const jwt= require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
  
    try{

        // const token= req.headers.authorization.split(" ")[1];
        const token= req.cookies.token; 
        console.log(req.cookies)   
        const decodeData=jwt.verify(token,"helloworld");
        // console.log(decodeData)
        req.email=decodeData.email
        next();

    }catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
}

module.exports= authMiddleware;