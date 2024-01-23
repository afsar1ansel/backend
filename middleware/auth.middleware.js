const jwt = require("jsonwebtoken")


const auth = (req,res,next)=>{
    const {cookieAuth, cookieRef} = req.cookies
    // console.log({"auth":cookieAuth,"ref":cookieRef})
    try {
        jwt.verify(cookieAuth,process.env.authToken, (err,data)=>{
            if(data){
                console.log({cookieAuth})
                next()
            }else{
                jwt.verify(cookieRef,process.env.refreshToken, (err,data)=>{
                    if(data){
                        const newToken = jwt.sign({data:"dataToken"},process.env.authToken,{expiresIn:"1h"})
                        res.cookie("cookieAuth",newToken, {maxAge:1*60*60*1000})
                        console.log({cookieRef}) 
                        next()
                    }else{
                        res.send({err:"please login"})
                    }
                })
            }
        })
    } catch (error) {
        res.send({err:error.message})
    }
    // next()
}

module.exports = auth;