import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://maadil624:Mad1234@cluster0.ioujzvf.mongodb.net/?retryWrites=true&w=majority')
            console.log("connected to mongoDB.....")
    }
    catch(err){
        console.log(`mongoDB err : ${err}`)
    }
}

export default connectDB