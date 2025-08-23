import express from "express"
import { Member } from "../Model/AddMember.js";
import {Check} from "../Middleware/Auth.js"
const router=express.Router()

router.post("/addMember",Check,async(req,res)=>{
const userID=req.user.id
const {name,email}=req.body;
try{
 if(!name){
  res.status(404).json({message:"all filed required"})
 }
 if(!userID){
   res.status(404).json({message:"user Id missing"})
 }
 await Member.create({
  name,
  email,
  userID
 })
 res.status(201).json({success:true,message:" New Member added"})
} catch(error){
  console.log(error)
  res.status(500).json({message:"Internal Server Error"})
}
})

router.get("/members",Check,async(req,res)=>{

 const member=await Member.find({userId:req.user.id})
 console.log(member)
 if(!member){
  res.status(404).json({message:"Not Found"})
 }
 res.status(200).json({data:member})
})




export default router