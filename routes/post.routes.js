const express = require("express");
const { PostModel } = require("../model/post.model");
var jwt = require("jsonwebtoken");
const postRouter = express.Router();


postRouter.post("/add", async (req, res) => {
  try {
      const notes = new PostModel(req.body);
      await notes.save();
      res.status(200).send("Note has been added");
   
  } catch (error) {
    res.send({ "msg": error.messege });
  }
});

postRouter.get("/", async (req, res) => {
  const token = req.headers.authorization
const decoded = jwt.verify(token,"masai")
  try {
    if(decoded){
      console.log(decoded);
    const note = await PostModel.find({"UserId":decoded.userId});
    console.log(note);
    res.status(200).send(note);
  }
  } catch (error) {
    res.send({ msg: error.messege });
  }
});

postRouter.get("/", async (req, res) => {
  const token = req.headers.authorization
const decoded = jwt.verify(token,"masai")
  try {
    if(decoded){
    const note = await PostModel.find({"UserId":decoded.userId});
   const result =  note.filter((e)=>e.device == req.query.device)
    res.status(200).send(result);
  }
  } catch (error) {
    res.send({ msg: error.messege });
  }
});

postRouter.get("/", async (req,res)=>{
  try {
    if(req.query.min && req.query.max){
      let data = await PostModel.find({no_of_comments:{$gt:req.query.min,$lt:req.query.max}})
      res.status(200).send(data)
    }
  } catch (error) {
    res.status(400).send({"msg" : error})
  }
})

postRouter.patch("/update/:id", async (req, res) => {
  const  id = req.params.id
  const data = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send(`Note has been updated`);
  } catch (error) {
    res.status(400).send({ "msg": error.messege });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const  id = req.params.id
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send(`Post has been deleted`);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
module.exports = { postRouter };
