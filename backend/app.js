import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app=express()
import cors from "cors"
import {connect} from "./db.js"
import AddExpenseRouter from "./Routes/AddExpenseRouter.js"
import UserRouter from "./Routes/UserRouter.js"
import cookie from "cookie-parser"
//cors origin
app.use(cors({
  origin:['http://localhost:3000'],
credentials:true
}))

//db connection
connect(process.env.MONGODB_CONNECTION_URL)
//middleware
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:true}))
//routes
app.use("/api",AddExpenseRouter)
app.use("/user",UserRouter)
app.get("/",(req,res)=>{
  res.send("working")
})


//routers
const PORT=process.env.PORT;
app.listen(PORT,()=>{
  console.log(`server stared on ${PORT}`);
})