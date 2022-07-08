const {body,validationResult}=require('express-validator');
const userModel = require('../model/userModel');
const asynchandler=require('express-async-handler');
const generateToken = require('../utils/generateToken');
const login=asynchandler(async(req,res)=>{
     const errors=validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }
     else{
        try {
            const {email,password}=req.body;
            let user=await userModel.findOne({email});
            if(user && (user.matchpassword(password))){
            res.status(200).json({
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                  mobile:user.mobile,
                  token:generateToken(user._id)
            })}
            else{
                res.status(400)
                throw new Error('Invalid email or password')
            }
        } catch (error) {
              res.status(400)
              throw new Error(error.message)
        }
     }
})
const register=asynchandler(async(req,res)=>{
    const errors=validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }
     else{
        let email=req.body.email;
        let existuser=await userModel.find({email});
        if(existuser){
            res.status(400);
            throw new Error('User already exist');
        }
        let user=await userModel.create(req.body);
        res.status(200).json({
             message:'User registered successfully'
        })
     }
})
const allUser=asynchandler(async(req,res)=>{
      const users=await userModel.find();
      if(users){
          res.status(200).json({
            data:users
          })
      }
      else{
        res.status(200).json({
            data:"User table is empty"
          })
      }
})
module.exports={login,register,allUser};