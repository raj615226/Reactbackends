"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    project: {
        type: String,
        required: true,
    },
    language: {
        type: String
    },
    time: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    appliedid: {
        type: String,
    },
});
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
const Project = mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
