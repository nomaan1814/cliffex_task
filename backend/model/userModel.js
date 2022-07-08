const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    mobile:{
        type:Number,
        required:true
    }
});
userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})
userSchema.methods.matchpassword=async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password);
}
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;