import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app=express()
import cors from "cors"
import {connect} from "./db.js"
import AddExpenseRouter from "./Routes/AddExpenseRouter.js"
import UserRouter from "./Routes/UserRouter.js"
import MemberRouter from "./Routes/AddMemberRouter.js"
import cookie from "cookie-parser"
//cors origin
app.use(cors({
  origin:['http://localhost:5173','https://expense-tracker-aj1e.vercel.app'],
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
app.use("/api",MemberRouter)
app.use("/user",UserRouter)
app.get("/",(req,res)=>{
  res.send(`working ${process.pid}`)
})


//routers
const PORT=process.env.PORT;
app.listen(PORT,()=>{
  console.log(`server stared on ${PORT} pid:${process.pid}`);
})
