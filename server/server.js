import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import helmet from 'helmet'
import connectDB from './database/database.js'
import route from './router/route.js'
import jobRoute from './router/jobRoute.js'
const app=express()

// initializing dont env
dotenv.config()

// middlewares
app.use(express.json())
app.use(cors())
app.use(route)
app.use(helmet())
app.use(jobRoute)

// setting port from env file

const port=process.env.PORT || 5000

//connecting to Monogo DB
connectDB()

// getting route from router folder
app.listen(5000,()=>{
    console.log("server started")
})