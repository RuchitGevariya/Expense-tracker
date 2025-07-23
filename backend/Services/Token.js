import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"
const secretkey=process.env.JWT_SECRET_KEY


export function setuser(user){
  
  const payload={
    id:user._id,
    email:user.email,
    name:user.username
  }
  
  return jwt.sign(payload,secretkey)
}

export function getuser(token){

  return jwt.verify(token,secretkey)
}