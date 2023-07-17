import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
            console.log("connected to mongoDB.....")
    }
    catch(err){
        console.log(`mongoDB err : ${err}`)
    }
}

export default connectDB