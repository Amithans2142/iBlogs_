const jwt= require('jsonwebtoken');
require('dotenv').config();


const user=async (req,res,next)=>{
    const token = req.header("Authorization").replace("Bearer ", "");
    if(!token){
        return res.status(401).json({
            message:"Please authenticate using a valid token"
        })
    }
    try{
     const data =  jwt.verify(token, process.env.JWT_SECRET);
     req.user=data;
     console.log('User data:', req.user);
     
     next();

    }
    catch (err) {
       
        console.error(err);
      
        return next(err);
    }
}
module.exports=user;

