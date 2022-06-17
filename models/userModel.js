const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({


    userName:{
        type:String,
        required:true,
        maxlength:8,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true,    
    },
    dob:{
        type:String,
    },
    branch:{
        enum:['CSE','ECE','MECH','IT'],
        type:String,
   
    },
    bio:{
        type:String,
      
    },
    token:{
        type:String
    },
    createdAt:{ 
        type: Date, default:Date.now()
    },
    updatedAt:{ 
        type: Date, default:Date.now()
    }
})



module.exports = mongoose.model('Users',userSchema);