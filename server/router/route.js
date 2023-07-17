import express from 'express'
import userController from '../controller/userController.js'
import { loginController } from '../controller/loginController.js'

// initilize express withb pre defined method rooouter for routing
const route=express.Router()

// importing testing from router folder
// logic part is implemented in testing part
// route.get('/',(req,res)=>{res.json("api..z..");})
// 
route.post('/register',userController)
route.post('/login',loginController)

export default route