require('dotenv').config()
const express =  require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors')
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose')
app.use(express.json());
app.use(cors());



//Database connection
const URI=process.env.MONGODB_URL;
mongoose.connect(URI, {
    
    useNewUrlParser:true,
    useUnifiedTopology:true
},err =>{
    if(err) throw err;
    console.log('DB connected');
})
//middleware for routes
app.use('/api',userRouter)

//Server setUp
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})