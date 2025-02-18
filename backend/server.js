import express from "express";
import cors from  "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
//app-config

const app= express()
const port = 4000

//middleware
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{

    res.send("API Working")
})

//DB connection
connectDB()

// API endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`server startred on http://localhost:${port}`);
    
})

//mongodb+srv://dattguruk4:Dattguruk4@cluster0.0culw.mongodb.net/?