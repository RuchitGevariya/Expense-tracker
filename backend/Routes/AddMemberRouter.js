import express from "express"
import { Member } from "../Model/AddMember.js";
const router=express.Router()

router.post("/addMember",async(req,res)=>{
const {name,email}=req.body;
try{
 if(!name||!email){
  res.status(404).json({message:"all filed required"})
 }
 await Member.create({
  name,
  email
 })
 res.status(201).json({success:true,message:" New Member added"})
} catch(error){
  console.log(error)
  res.status(500).json({message:"Internal Server Error"})
}
})

router.get("/members",async(req,res)=>{
 const member=await Member.find()
 if(!member){
  res.status(404).json({message:"Not Found"})
 }
 res.status(200).json({data:member})
})




export default router