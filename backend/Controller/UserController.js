import { User } from "../Model/user.js";
import argon from "argon2";
import { setuser } from "../Services/Token.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
export async function HandleSingup(req, res) {
  try {
    const { email, username, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "bad request" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const haspassword = await argon.hash(password);
    if (!haspassword) {
      return res.status(400).json({ message: "password not hased wait.." });
    }
    await User.create({
      username,
      email,
      password: haspassword,
    });
    res.status(200).json({ success: true, messgae: "register successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server issues" });
  }
}

export async function HandleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "bad request" });
    }
    const trimEmail = email.trim();
    const trimPassword = password.trim();
    const user = await User.findOne({ email: trimEmail });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const macthPassword = await argon.verify(user.password, trimPassword);
    if (!macthPassword) {
      return res.status(401).json("wrong password");
    }
    const token = setuser(user);
    if (!token) {
      return res
        .status(400)
        .json({ message: "token not created", success: true });
    }
    res.cookie("uid", token, {
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      path: "/",
      sameSite: "None",
    });
    res.status(200).json({ success: true, message: "User login successfull" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
}
export async function HandleLogout(req, res) {
  res.clearCookie("uid", {
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "None",
  });
  return res.status(200).json({ success: true, message: "logut successfull" });
}

export async function HandleForgotPassword(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "please enter the email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const token = crypto.randomBytes(32).toString("hex");
  
    user.resetToken = token;
    user.tokenExpaire = Date.now() + 1000 * 60 * 15;
    await user.save();
    const resetlink = `https://expense-tracker-six-lime.vercel.app/reset-password/?token=${token}`;

    //configration of Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Link",
      html: `
     <p>Hello ${user.username},</p>
    <p>You requested a password reset. Click the link below to set a new password:</p>
    <p><a href="${resetlink}">Reset your password</a></p>
    <p>This link will expire in 15 minutes.</p>
    `,
    });
    res
      .status(200)
      .json({ success: true, message: "resetLink-mail send successfully" });
  } catch (error) {
    console.error(error)
    res.status(501).json({message:"Server issue"})
  }
}
export const HandleResetPassword=async(req,res)=>{
const {token,newPassword}=req.body
if(!token||!newPassword){
 return res.status(404).json({success:false,message:"all filed are required"})
}
try{
   const user=await User.findOne({
    resetToken:token,
    tokenExpaire:{$gt:Date.now()}
   })
   if(!user){
  return res.status(400).json({ message: "Token is invalid or expired" })
   }
   const haspassword=await argon.hash(newPassword)
   if(!haspassword){
    res.json({message:"password hasing wait.."})
   }
   user.password=haspassword
   user.resetToken=undefined
   user.tokenExpaire=undefined
   user.save()
   res.status(200).json({success:true, message: "Password reset successfully" });
   }catch(error){
    console.error(error)
   }
}