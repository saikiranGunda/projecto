const Users= require('../models/userModel');
const JWT =  require('jsonwebtoken')
const bcrypt = require('bcrypt');






const userCtrl = {
//registerUser
registerUser:async(req,res) => {
    try{
        let { userName,email,password}= req.body;
         console.log(req.body)
        if(!userName||!email||!password){
            return res.json({
                success:false,
                message:"Please enter all the fields",
                status:400
            })
        }else{
           let findUser = await Users.findOne({email:email});
            console.log(findUser);
            if(findUser){
              return res.json({
                 success:false,
                  message:"User already exists!please login now",
                  status:400  
              })}else{
                  const hashedPassword= await bcrypt.hash(password,10);
                  console.log(hashedPassword);
                 let newUser = new Users({
                    userName:userName,
                    email:email,
                    password:hashedPassword
                })
                console.log(newUser);
                await Users.create(newUser)
                   res.send({
                    success:true,
                    message:"Registered Successfully.",
                    status:200

              })
            }
            }
       }
      catch(err){
          console.log(err);
          return res.json({
            success:false,
            message:"Something went wrong please try agaia",
            status:404
        })
      }
      
},
//Login user
loginUser:async(req,res)=>{
 try{
    let { email,password } = req.body;
    console.log(req.body);
    let data = await Users.findOne({email:email});
    console.log(data,"data");
    if(!data){
        return res.json({
            success:false,
            status:400,
            message:"user with this email doesn't exist so please signup now"
        })
    }
        else{
          const isMatch = await bcrypt.compare(password,data.password);
          console.log(isMatch,"ismatch");
          if(isMatch){
                let token = JWT.sign({userId:data._id},process.env.JWT_SECRET,{expiresIn:'1d'});
                console.log(token,"token");
                if(token){
                    let updateToken = await Users.updateOne({_id:data._id},{$set:{token:token}});
                    console.log(updateToken,"updateToken");
                    return res.json({
                        success:true,
                        status:200,
                        message:"login Successfully",
                        token:token
                })
                }else{
                    return res.json({
                        success:false,
                        status:400,
                        message:"Something went wrong please try again"  
                })
            }
          }else{
            return res.json({
                success:false,
                status:400,
                message:"Login credentials are incorrect please check"
            })
          }
        }
    
 }catch(err){
    console.log(err);
 }
   
},
//get profile
getProfile:async(req,res) =>{
    try{
        let currentUser = req.findUser;
        console.log(currentUser,"currentUser");
        return res.json({
            success:true,
            status:200,
            userName:currentUser.userName,
            email:currentUser.email
        })

    }catch(err){
        console.log(err);

    }
},
//updateProfile
updateprofile:async(req,res) =>{
    try{
        let currentUser = req.findUser;
        console.log(currentUser,"currentUser");
        let query1 = {};
         let {branch,bio,dob} = req.body;
         console.log(req.body);
         query1 = {$set:{dob:dob,branch:branch,bio:bio}};
         let updateUser = await Users.updateOne({_id:currentUser._id},query1);
         console.log(updateUser,"updateUser");
         if(updateUser){
            let user =  await Users.findById({_id:currentUser._id})
            return res.json({
                success:true,
                status:200,
                userName:user.userName,
                email:user.email,
                dob:user.dob,
                branch:user.branch,
                bio:user.bio
            })
         }else{
            return res.json({
                success:false,
                status:400,
                message:"something went wrong please try again"
            })
         }

    }catch(err){
        console.log(err);
        return res.json({
            success:false,
            status:400,
            message:"somethig went wrong"
        })
    }
},
//LogOut User
logOut:async(req,res)=>{
    try{
        let currentUser = req.findUser;
        console.log(currentUser,"currentUser");
        let deleteUser =  await Users.deleteOne({_id:currentUser._id})
        console.log(deleteUser,"deleteUser");

    }catch(err){
        console.log(err);
    }
}





}



module.exports = userCtrl;