import mongoose, { Types } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email:{
       type:String,
       unique:true
    },
    username:{
      type: String,
      required: true,
    },
    password:{
      type:String,
      required:true
    }
   
  },
  { timestamps: true }
);

 export const User=mongoose.model("user",UserSchema)