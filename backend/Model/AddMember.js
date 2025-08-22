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
  },
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
})

export const Member=mongoose.model("member",MemberSchema)