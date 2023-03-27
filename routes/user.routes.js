const express = require("express")
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {UserModel} = require("../model/user.model")


//Registration
userRouter.post("/register", async (req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body;
    try {
        bcrypt.hash(password,5,async (err,hash)=>{
            const user = new UserModel({name,email,gender,password:hash,age,city,is_married})
            await user.save()
            res.status(200).send({"msg" : "user has been add"})
        })
    } catch (error) {
        res.status(400).send({"msg" : error.message})
    }
})

//Login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email});
        if(user){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                const token = jwt.sign({userID: user[0]._id},"masai")
                result
                ? res.status(200).send({ msg: "Logged in", token: token })
                : res.status(400).send({ msg: `Check the credentials` });
            })
        }
    } catch (error) {
        res.status(400).send({"msg" : error.message})
    }
})


module.exports={
    userRouter
}