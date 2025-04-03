import { Product } from "../../../database/models/Product/Product.model.js";
import { User } from "../../../database/models/User/User.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";

export const addProductToWishlist=catchError(async(req,res,next)=>{
    let{product}=req.body
    let prod= await Product.findById(product)
    if(!prod)return next(new AppError("NO Product Exist To add To Wishlist ",404))

        if(req.user.wishlist.includes(product)){
    let {wishlist}=await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:product}},{new:true})
    res.json({message:"success",wishlist})

        }

        else{
            let {wishlist}=await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:product}},{new:true})
            res.json({message:"success",wishlist})
        }



})
export const getUserWishlist=catchError(async(req,res,next)=>{

    let {wishlist}=await User.findById(req.user._id).populate('wishlist')
    if(!wishlist)return next(new AppError("NO ",404))
        res.json({message:"success",wishlist})
})