const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const userModel = require("../model/userModel");
const authController=asynchandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization &&  req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.user=await userModel.findById(decode.id).select('-password');
            next()
        } catch (error) {
            res.status(400);
            throw new Error("Not authorized token");
        }
        if(!token){
            res.status(400);
            throw new Error("Not authorized token");
        }
    }
    else{
        res.status(400);
        throw new Error("Not authorized");
    }
})
module.exports=authController;