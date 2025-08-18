import mongoose from "mongoose"

const MemberSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String
  },
  joinAT:{
    type:Date,
    default:Date.now
  }
})

export const Member=mongoose.model("member",MemberSchema)