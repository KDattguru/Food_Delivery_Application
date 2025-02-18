import mongoose from "mongoose";
export  const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://dattguruk4:Dattguruk4@cluster0.0culw.mongodb.net/food-del').then(()=>console.log("Connected DB Successfully"));

    
}