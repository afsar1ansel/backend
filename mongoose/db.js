const mongoose = require('mongoose')
const dotenv = require("dotenv").config()


async function dataBase(){
    try {

       await mongoose.connect(process.env.mongoURL);
        console.log(
            'db connected'
        )
    } catch (error) {
        console.log('db not conneted')
        console.log(error)
    }
}




module.exports = dataBase