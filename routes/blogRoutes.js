const express = require("express")
const blogRoutes = express.Router()
const Blog = require("../model/blogModel")
const auth = require("../middleware/auth.middleware")


blogRoutes.use(auth)


blogRoutes.get("/",async(req,res)=>{

    try {

        const data = await Blog.find()
        res.send(data)
    } catch (error) {
        res.send({err:error.message})
    }
})

blogRoutes.post("/add",async(req,res)=>{
    const data = req.body
    try {
        const blog = new Blog(data)
       await blog.save()
        res.send({blog})

    } catch (error) {
        res.send({err:error.message})
    }
})

blogRoutes.patch("/update/:id",async(req,res)=>{
    const {id} = req.params
    
    try {
        const blog = await Blog.findByIdAndUpdate(id,req.body,{new:true})
        res.send({blog})

    } catch (error) {
        res.send({err:error.message})
    }
})

blogRoutes.delete("/delete/:id", async (req,res)=>{

    const {id} = req.params

    try {

        const blog = await Blog.findByIdAndDelete(id)
        res.send(`data has been deleted with given id : ${id}`)

    } catch (error) {
        res.send({err:error.message})
    }
})


module.exports = blogRoutes