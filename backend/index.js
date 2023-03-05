const express=require('express');
const mongoose=require('mongoose');
const Vendor=require('./models/vendorLogin');
const conn=require('./connection/connec');
const registerRoute=require('./routes/register');
const loginRoute=require('./routes/login');
const vendorRoute=require('./routes/vendorRoutes');
const userRegister=require("./routes/userRegister");
const userLogin=require("./routes/userLogin");
const jwt=require("jsonwebtoken");

conn();
const app=express();

app.use('/vendor',(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err){
                return res.status(403).json({message:"token is not valid"});
            }
            // req.Vendor=decoded.data
            next();
        });
    }
    else{
        return res.status(403).json({message: 'You are not authenticated'})
    }
})

app.use('/user',(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err){
                return res.status(403).json({message:"token is not valid"});
            }
            next();
        });
    }
    else{
        return res.status(403).json({message: 'You are not authenticated'})
    }
})
app.use('/',registerRoute)
app.use('/',loginRoute)
app.use('/',userRegister)
app.use('/',userLogin)
app.use('/',vendorRoute)


app.listen(8080, () => console.log('Server is running......'));

