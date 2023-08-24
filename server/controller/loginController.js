import userModels from "../models/userModels.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // email="shbc",password="xszx"
        console.log(email, password)
        if (!email && !password) {
            res.status(400).send({
                sucess: false,
                message: "provide the login and pass"
            })
        }
        // getting email to validate the password
        let pass=await userModels.findOne({email})
        console.log("password line",pass)
        if(pass==null||!pass){
            res.status(400).send({
                sucess: false,
                message: "email or password is wrong"
            })
        }else{
            // password validation using bcrypt compare
            let validpass=await bcrypt.compare(password,pass.password)
            // console.log(validpass)
            
            //Agaring fetching data 
            const user = await pass && validpass
            // const signt=id=>{
                //     return jwt.sign({id},"hello",{expiresIn:"1m"})
                // }
                if (!user) {
                    res.status(400).send({
                        sucess: false,
                        message: "email or password is wrong.."
                    })
                }
                const token=jwt.sign({id:user._id},"hello",{expiresIn:"10m"})
                if(user){

                    res.status(200).send({
                        sucess: true,
                        message: "login sucessfull..",
                        token
                    })
                }
            }
        // const token=signt(user.email)
    }
    catch (err) {
        console.log("error at login controller...",err)
    }
}

export const verifyUser=async(req,res,next)=>{
    const token=req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({
            status:"false",
            message:"no token provided"
        })
    }
    try{
        const decoded=jwt.verify(token,'hello')
        next()
    }catch(err){
        return res.status(200).json({
            status:"false",
            message:err.message
        })
    }
}

export const allUsers=async(req,res)=>{
    try{
        const users= await userModels.find()
        return res.status(200).json({
            status:"success",
            data:{users}
        })

    }catch(err){
        res.status(400).json({
            status:"false",
            message:err.message
        })
    }

}