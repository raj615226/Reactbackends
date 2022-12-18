import User from "../model/User";
import dotenv from 'dotenv';
import { RequestHandler, Request, Response } from "express";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Hash } from "crypto";

interface type {
    status: string,
    msg: string,
    data?: any,
    token?:any
}

dotenv.config();

export const createcontroller: RequestHandler = async (req: Request, res: Response) => {
    let response: type = {
        status: 'error',
        msg: 'Something went wrong.'

    }
    try {
        const verifyuser = await User.find({ 'email': req.body.email })
        console.log(verifyuser)
        if (verifyuser[0]?.email) {
            res.status(400).send({
                "status": "failure",
                "msg": "enter user already register"
            })
        } else {
            var jwtstring:any=process.env.JWT_SECRET;
            const tokens:String = jwt.sign({_id:req.body.email},jwtstring, { expiresIn: '7 days' })
            const hashpassword:HashAlgorithmIdentifier = await bcrypt.hash(req.body.password, 12)
            const user = new User({
                email: req.body.email,
                token: tokens,
                password: hashpassword,
                type:req.body.type,
                name:req.body.name

            })
            await user.save()
            response = {
                status: "success",
                msg: "user created",
                data: user,
            }
        }

    } catch (err) {
        console.log(err)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'

        }
    } finally {
        res.send(response)
    }
}
export const logincontroller: RequestHandler = async (req: Request, res: Response) => {
    let response: type = {
        status: 'error',
        msg: 'Something went wrong.'

    }
    try {
        const user:any= await User.findByCredentials(req.body.email)
        var hashpassword:any = user.password
            var isMatch = await bcrypt.compare(req.body.password,hashpassword)
        if(isMatch){
             const token = await user.generateAuthToken()   
        response={
            "status" : "success",
            "msg" : "details found",
            data:user,
        }
    }else{
        response={
            status: 'failed',
            msg: 'Enter a valid password.'
        }
    }

    } catch (err) {
        console.log(err)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'

        }
    } finally {
        res.send(response)
    }
}
export const logutController:RequestHandler=async(req:Request,res:Response)=>{
    let response :type = {
        status: 'error',
        msg: 'Something went wrong.',
     }
     try{
        const token:any =req.header('Authorization')?.replace('Bearer','')
        const jwtstring:any= process.env.JWT_SECRET
        const decoded:any= jwt.verify(token,jwtstring)
        const queryData = await User.findOneAndUpdate(
            { email:decoded._id},
            { $set: 
                {   
                    token:null
                }
            }
        )
            response={
                status:'success',
                msg:'Logout successfully'
            }
    } catch(err){
        console.log(err)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'

        }
} finally {
    res.send(response)
}
}
export const getprofileController:RequestHandler=async(req:Request,res:Response)=>{
    let response :type = {
        status: 'error',
        msg: 'Something went wrong.',
     }
     try{
         const profile:any=await User.findOne({_id:req.body.appliedid},{email:1,type:1})
            response={
                status:'success',
                msg:'Data found successfully',
                data:profile
            }
    } catch(err){
        console.log(err)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'

        }
} finally {
    res.send(response)
}
}