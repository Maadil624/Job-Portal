import jobModel from "../models/jobModel.js"
// console.log("hii")
export const jobController=async(req,res)=>{
    try{
    const {company,position}=req.body
    if(!company||!position){
        res.status(400).send({
            sucess:false,
            message:"please provide job and company createjob"
        })
    }
    const extjob=await jobModel.findOne({company,position})
    if(extjob){
       return res.status(200).send({
        sucess:true,
        message:"job already exists"
       }) 
    }
    const newjob={
        company,
        position
    }
    const job =await jobModel.create(newjob)
    res.status(200).json({
        sucess:true,
        message:"job created sucessfully......"
    })
}
catch(err){
    console.log(err)
}
}

export const allJobs=async(req,res)=>{
    const job=await jobModel.find();
    res.status(200).json({
        sucess:true,
        job,
        totalJobs:job.length
    })
}

export const updatejob=async(req,res)=>{
    try{
        const {id}=req.params
        const {position,location}=req.body
        if(!location||!position){
            console.log("provide the job n position name")
        }
        const job=await jobModel.findOne({_id:id})
        if(!job){
            console.log("job is not there.....")
        }
        const updatejob=await jobModel.findOneAndUpdate({_id:id},{
            location,
            position
        })
        res.status(200).json({
            sucess:true,
            updatejob
        })



    }
    catch(err){
        console.log(err)
    }
}

export const deletejob=async(req,res)=>{
    try{
        const {id}=req.params
        const job=await jobModel.findOne({_id:id})
        if(!job){
            console.log("job not found...")
        }
        await job.deleteOne({_id:id})
        res.status(200).json({
            sucess:true,
            msg:"job deleted....",
            job
        })
    }
    catch(err){
        console.log(err)
    }
}