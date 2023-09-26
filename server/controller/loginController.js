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
                message: "provide the login details"
            })
        }
        const condition1 = { email: email };
        const condition2 = { role: 'Admin' };
        // Use $and to combine conditions
        const query = { $and: [condition1, condition2] };
        // getting email to validate the password
        let pass = await userModels.findOne({ email })

        // let admin = await userModels.findOne(query)
        // let admin=admins.filter(data=>{
        //     return data.email==email
        // })
        // console.log('admin', admin[0])
        // console.log('admin', admin)
        console.log("password line", pass)
        // console.log(admin)
        if (pass == null || !pass) {
            return res.status(400).send({
                sucess: false,
                message: "email or password is wrong"
            })
        } else {
            let role=pass.role
            // password validation using bcrypt compare
            let validpass = await bcrypt.compare(password, pass.password)
            console.log(validpass)

            //Agaring fetching data 
            const user = await pass && validpass
            console.log(user)
            // const signt=id=>{
            //     return jwt.sign({id},"hello",{expiresIn:"1m"})
            // }
            if (!user) {
                return res.status(400).send({
                    sucess: false,
                    message: "email or password is wrong.."
                })
            }
            if(user){
                const token = jwt.sign({ id:pass._id,username:role}, "hello", { expiresIn: "30m" })
                if(role=='Admin'){
                    return res.status(200).send({
                        sucess: true,
                        message: "Admin login sucessfull..",
                        role,
                        pass,
                        token
                    })
                }
                else{
                    if (user&&role=='user') {
                    return res.status(200).send({
                        sucess: true,
                        message: "login sucessfull..",
                        role,
                        pass,
                        token
                    })
                }
            }
        }
    }
        // const token=signt(user.email)
    }
    catch (err) {
        console.log("error at login controller...", err)
    }
}

export const verifyUser = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).json({
            status: "false",
            message: "no token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, 'hello')
        next()
    } catch (err) {
        return res.status(200).json({
            status: "false",
            message: err.message
        })
    }
}

export const allUsers = async (req, res) => {
    try {
        const {data} = req.query
        console.log(req.query)
        const users = await userModels.find()
        // validate here also with backend database 
        // take input from admin end to check the existence of details in db
        // then send the details to frontend if true
        let admin=users.filter((data,id)=>{
            if(data.role=="Admin"){
                return data
            }
        })
        // console.log(admin[0].role==data)
        if(admin[0].role==data){
            return res.status(200).json({
                sucess:true,
                message:'All users details',
                data: { users }
            })
        }
        else{
            return res.status(200).json({
                success:false,
                message:"only Admins can access",
            })
        }

    } catch (err) {
        res.status(200).json({
            status: "false",
            message: err.message
        })
    }

}