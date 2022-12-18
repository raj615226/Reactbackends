import mongoose, { Model, Schema } from "mongoose"

const projectSchema:Schema =new mongoose.Schema({
    project : {
        type: String,
        required:true,
    },
    language:{
        type:String
    },
    time:{
        type:String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    userid:{
        type:String,
        required:true
    },
    appliedid:{
        type:String,
    },
    

})
// userSchema.methods.generateAuthToken = async function (){
//     const user = this
//     const token = wt.sign({ _id: user.username},process.env.JWT_SECRET)
//     user.token = token
//     await user.save()
//     return token
// }
// userSchema.statics.findByCredentials = async (username)=>{
//     const user = await User.findOne({username})
//     if(!user){
//         throw new Error('unable to login')
//     }
//     return user
// }

const Project:any = mongoose.model('Project', projectSchema)

export default Project; 