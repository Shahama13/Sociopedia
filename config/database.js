import mongoose from "mongoose"

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((e)=>console.log(`database connected at ${e.connection.host}`))
    .catch((e)=> console.log(e.message))
}