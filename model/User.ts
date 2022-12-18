import mongoose, { Model, Schema } from "mongoose"
import jwt from "jsonwebtoken";


const userSchema:Schema =new mongoose.Schema({
    email : {
        type: String,
        required:true,
        trim:true
    },
    token:{
        type:String
    },
    password:{
        type:String,
        required: true
    },
    type:{
        type:String
    },
    name:{
        type:String
    }
})
userSchema.methods.generateAuthToken = async function (){
    const user = this
    var jwtstring:any=process.env.JWT_SECRET;
    const token = jwt.sign({_id:this.email},jwtstring, { expiresIn: '7 days' })
    user.token = token
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }
    return user
}

const User:any = mongoose.model('User', userSchema)

export default User; 