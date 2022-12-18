import { RequestHandler,Request,Response } from "express";
import Project from "../model/Project";

interface type {
    status: string,
    msg: string,
    data?: any,
}
export const createProjectController:RequestHandler=async(req:Request,res:Response)=>{
    let response: type = {
        status: 'error',
        msg: 'Something went wrong.',
    }
    try {
        const project:any=new Project({
            project : req.body.project,
            language: req.body.language,
            time: req.body.time,
            value: req.body.value,
            userid: req.body.userid,

        });
        await project.save()
        response={
            status: 'success',
            msg: 'Data created.',
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
export const getProjectController:RequestHandler=async(req:Request,res:Response)=>{
    let response: type = {
        status: 'error',
        msg: 'Something went wrong.',
    }
    try {
        const project:any[]=await Project.find({})
        if(project.length > 0){
        response={
            status: 'success',
            msg: 'Data found.',
            data:project
        }
    }else{
            response={
                status: 'success',
                msg: ' No Data found.',
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
export const appliedProjectController:RequestHandler=async(req:Request,res:Response)=>{
    let response: type = {
        status: 'error',
        msg: 'Something went wrong.',
    }
    try {
        const project:any=await Project.findOneAndUpdate({_id:req.body._id},
            {$set:
        {
            appliedid:req.body.appliedid
        }
        } )
        response={
            status: 'success',
            msg: 'Applied Successfully.',
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
export const viewappliedProjectController:RequestHandler=async(req:Request,res:Response)=>{
    let response: type = {
        status: 'error',
        msg: 'Something went wrong.',
    }
    try {
        console.log(req.body)
        const project:any[]=await Project.find({'userid':req.body._id})
        console.log(project)
        if(project.length > 0){
        response={
            status: 'success',
            msg: 'Data created.',
            data:project
        }
    }else{
        response={
            status: 'success',
            msg: ' No Data created.',
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
