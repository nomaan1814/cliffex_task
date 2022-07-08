const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config({path:`${__dirname}/../.env`});
const connectDb=require('./database/db');
const userRoute = require('./route/userRouter');
const errorHandler = require('./middlewares/erroHandler');
app.use(express.json())
connectDb();
const port=process.env.PORT||5000;
app.get('/',(req,res)=>{
    res.send("hfhfbh")
})
app.use('/api/user',userRoute);
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})