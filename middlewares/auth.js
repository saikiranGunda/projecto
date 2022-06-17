const jwt = require('jsonwebtoken');
const Users = require('../models/userModel')



exports.isAuth=async(req,res,next)=>{
    if(req.headers && req.headers.authorization){
        const token =req.headers.authorization.split(' ')[1];
        console.log(token,"token");
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode,"decode");
        const findUser = await Users.findById(decode.userId);
        console.log(findUser);
        if(!findUser){
            return res.json({
               success:false,
               message:"un Authorized Access",
               status:400
            })
        }else{
            req.findUser = findUser
            next();
        }
    }else{
      res.json({success:false,message:"unAuthorized Access"});
    }
}