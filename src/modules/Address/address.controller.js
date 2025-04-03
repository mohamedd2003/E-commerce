import { User } from "../../../database/models/User/User.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";

export const addAddress=catchError(async(req,res,next)=>
    {
let{addresses}=await User.findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
let count=addresses.length
res.json({message:"success",Number_Of_Addressess:count,addresses})
    })
export const removeAdrress=catchError(async(req,res,next)=>
    {
        let{id}=req.params
        let isExist=await User.findOne({_id:req.user._id,addresses:{_id:id}})
if(!isExist)return next(new AppError("Address Not Found",404))
let{addresses}=await User.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
let count=addresses.length
res.json({message:"success",Number_Of_Addressess:count,addresses})
    })