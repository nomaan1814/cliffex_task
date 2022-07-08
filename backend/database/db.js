const mongoose=require('mongoose');
const connectDb=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`DB connected ${conn.connection.host}`)
    } catch (error) {
          console.log(error.message);
          process.exit()
    }
}
module.exports=connectDb;