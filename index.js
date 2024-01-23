const express = require('express')
const userRoute = require("./routes/userRoute")
const dotenv = require("dotenv").config()
const dataBase = require("./mongoose/db");
const cookieParser = require("cookie-parser");
const blogRoutes = require('./routes/blogRoutes');
const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/user",userRoute)
app.use("/blog",blogRoutes)

// app.get('/',(req,res)=>{
//     res.send("Home")
// })




app.listen(PORT,async ()=>{
    await dataBase()
    console.log('im linting')
})