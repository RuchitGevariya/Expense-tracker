import { getuser } from "../Services/Token.js";

export function Check(req,res,next) {
  const token=req.cookies?.uid;
  if(!token){
     console.log("No UID cookie found");
      return res.status(401).json({ message: "Please login first" });
  }
  try{
  const user=getuser(token)
  if(!user){
     console.log("Invalid admin");
      return res.status(401).json({ message: "Invalid user credentials" });
  }
  req.user={id:user.id,name:user.name}
  next()

  } catch(error){
console.log(error);
 return res.status(401).json({ message: "Token invalid or expired" });
  }
}