const express = require('express')
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

const userRoute = express.Router()

userRoute.get('/',async(req,res)=>{

    try {
        let data = await User.find()
        res.send(data)
    } catch (error) {
        console.log({error})
    }
})

userRoute.post("/register",async(req,res)=>{
    const data = req.body;
    console.log("here "+data)
    try {
        const user = new User(data)
        await user.save()
        res.send(user)

    } catch (error) {
        res.send({error})
    }
})

userRoute.post("/login", async (req,res)=>{
    const data = req.body
    try {
        const user = await User.findOne(data)
        if(user){
          const authToken =   jwt.sign({userId:user._id},process.env.authToken,{expiresIn:"1h"})
          const refToken = jwt.sign(
            { userId: user._id },
            process.env.refreshToken,
            {expiresIn:"7d"}
          );
          res.cookie("cookieAuth", authToken,{maxAge:1*60*60*1000})
          res.cookie("cookieRef",refToken,{maxAge:7*24*60*60*1000})
          res.send({user,authToken,refToken})
        }else{
            res.send({error:"Invilade user name"})
        }
    } catch (error) {
        res.send({err:error.message})
    }
})

module.exports = userRoute