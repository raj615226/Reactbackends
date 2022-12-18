import dotenv from "dotenv";
import Jwt from "jsonwebtoken"
import {NextFunction, Request,RequestHandler,Response} from "express";
import User from "../model/User";
export const userAuth:RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token:any= req.header('Authorization')?.replace('Bearer','')
        console.log(token)
        const jwt:any=process.env.JWT_SECRET
        const decoded:any = Jwt.verify(token,jwt)
        const query:any=await User.findOne({'email':decoded._id})
        console.log(query)
        if(Object.keys(query).length > 0){
           req.body= query
            next()
        }
        else{
            res.send({error:"Not able to verify"})
        }
    }
    catch(err){
        res.send({error:"Unable to authenticate"})

    }
}