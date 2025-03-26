import jwt from "jsonwebtoken"
import AppError from "../../utils/appError.js"
import { User } from "../../../database/models/User/User.model.js"

export const auth=(req,res,next)=>{
    let {token}=req.headers
    let userPayload=null
    if(!token)return next(new AppError('You Must Be loggedIn First'),401)
    jwt.verify(token,"MYSECRETKEY",async(err,payload)=>{
        if (err) return next(new AppError(err))
      else{
  
    let existuser = await User.findById(payload.id)

    if(!existuser) return next(new AppError("Invalid token or User Not Found",404))
        userPayload=payload
        req.user=existuser
if(existuser.passwordChangedAt){
    let time=parseInt(existuser.passwordChangedAt.getTime()/1000)
    let tokenTime=userPayload.iat
if(time>tokenTime) return next(new AppError("invalid token .... Login again",401))
}
        next()
    }
    })
}