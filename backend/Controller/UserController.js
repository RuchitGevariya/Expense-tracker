import { User } from "../Model/user.js";
import argon from "argon2";
import { setuser } from "../Services/Token.js";

export async function HandleSingup(req, res) {
  try {
    const { email, username, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "bad request" });
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
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const macthPassword = await argon.verify(user.password, password);
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      path:"/",
      sameSite:None
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    path:'/',
    sameSite:'None'
  });
  return res.status(200).json({ success: true, message: "logut successfull" });
}
export async function HandleProfile(req,res) {
    try{
  const username=req.user.name

  if(!username){
    res.status(500).json({success:false,message:"Server might be not fetch profile"})
  }
  res.status(200).json({success:true,username:username})

  } catch(error){
    return res.status(500).json({message:"server issue"})
  }
}
