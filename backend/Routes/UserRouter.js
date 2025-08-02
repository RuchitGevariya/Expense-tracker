import express from "express";
const router = express.Router();
import { HandleSingup,HandleLogin,HandleProfile,HandleLogout,HandleForgotPassword,HandleResetPassword} from "../Controller/UserController.js";
import { Check } from "../Middleware/Auth.js";

router.post("/signup",HandleSingup)
router.post("/login",HandleLogin)

router.get("/checkAuth",Check,(req,res)=>{
  return res.status(200).json({success:true,user:{id:req.user.id,username:req.user.name},message:"user authorised"})
})
router.get("/logout",Check,HandleLogout)

router.get("/profile",Check,HandleProfile)

router.post("/forgot-password",HandleForgotPassword)

router.post("/reset-password",HandleResetPassword)
export default router 