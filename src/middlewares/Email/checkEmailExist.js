import { User } from "../../../database/models/User/User.model.js";
import AppError from "../../utils/appError.js";
import { catchError } from "../Error/catchError.js";

export const checkEmailExist=catchError(async(req,res,next)=>{
    let emailExist=await User.findOne({email:req.body.email})
    emailExist?next(new AppError(`User With Email:  ${req.body.email} Already Exist`,401)):next()
})