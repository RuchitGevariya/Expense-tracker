import express from "express";
import { Member } from "../Model/AddMember.js";
import { Check } from "../Middleware/Auth.js";
const router = express.Router();

router.post("/addMember", Check, async (req, res) => {
  const userID = req.user.id;
  const { name, email } = req.body;
  try {
    if (!name) {
      res.status(404).json({ message: "all filed required" });
    }
    if (!userID) {
      res.status(404).json({ message: "user Id missing" });
    }
    await Member.create({
      name,
      email,
      userID,
    });
    res.status(201).json({ success: true, message: " New Member added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/members", Check, async (req, res) => {
  const member = await Member.find({ userID: req.user.id });
  if (!member) {
    res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json({ data: member });
});


// put request
router.put("/members/update/:id", Check, async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name || !id) {
    res.status(404).json({ success: false, message: "all filed are required" });
  }
  const update = await Member.findByIdAndUpdate(id, { name }, { new: true });
  res.status(200).json({success:true,message:"Document Update"})
});



router.delete("/members/delete/:id",async(req,res)=>{
    const id = req.params.id;
 if(!id){
  res.status(404).json({message:"id required to delete member"})
 }
  const deleteMember= await Member.FindByIDAndDelete(id)
if(!deleteMember){
  return res.status(404).json({message:"Data Not Found"})
}
res.status(200).json({success:true,message:"Data has be Deleted "})
})



router.get("/members/total", Check, async (req, res) => {
  const member = await Member.find({ userID: req.user.id });
  if (!member || member.lenght === 0) {
    return res.status(200).json({ total: 0 });
  }
  res.status(200).json({ total: member.length });
});

export default router;
