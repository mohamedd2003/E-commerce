import { catchError } from "../../../src/middlewares/Error/catchError.js";
import { Cart } from "./cart.model.js";

export const addToCart=catchError(async(req,res,next)=>{
let isExist=await Cart.findOne({user:req.user._id})
if(!isExist){
    let cart=new Cart({
        user:req.user._id,
        cartItems:[req.body]
    })
    await cart.save()

    res.json({message:'success',cart})
}else{
    res.json({message:"User Alrea"})
}
})