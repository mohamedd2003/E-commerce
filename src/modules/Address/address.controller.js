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
let{addresses}=await User.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
let count=addresses.length
res.json({message:"success"})
    })

    export const getAllUserAddresses=catchError(async(req,res,next)=>{
 
        
        let {addresses}=await User.findById(req.user._id)
        let count=addresses.length
        if(addresses.length===0)return next(new AppError("No Addresses Exist",404))
            res.json({message:"success",NumberOfAddresses:count,addresses})
    })


    // export const updateAddress=catchError(async(req,res,next)=>{
    //     let {addresses}=await User.findOneAndUpdate({_id:req.user._id,addresses:},{addresses:req.body},{new:true})
    //     res.json(addresses)
        
    //     res.json({message:"success",address})

    // })