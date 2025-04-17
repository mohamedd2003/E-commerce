import { Cart } from "../../../database/models/Cart/cart.model.js";
import { Order } from "../../../database/models/Order/order.model.js";
import { Product } from "../../../database/models/Product/Product.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";

export const createCashOrder=catchError(async(req,res,next)=>{
    let cart= await Cart.findById(req.params.id)
    if(!cart) return next(new AppError("Cart Not Found",404))
    let totalOrderPrice=cart.totalCartPrice||cart.totalCartPriceAfterDiscount


    let order= new Order({
        user:req.user._id,
        orderItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body,

    })
    await order.save()

    let options=cart.cartItems.map((prod)=>{
        return(
            {
                updateOne:{
                    "filter":{_id:prod.product},
                    "update":{$inc:{sold:prod.quantity,stock:-prod.quantity}}
                }
            }
        )
    })

    await Product.bulkWrite(options)
    await Cart.findByIdAndDelete(cart._id)
    res.json({message:"success",order})
})


export const getAllOrders=catchError(async(req,res,next)=>{
    let orders=await Order.find().populate('orderItems.product')
    let totalOrders=orders.length
    res.json({message:'success',Total_Orders:totalOrders,orders})
})
export const getLoggedUserOrders=catchError(async(req,res,next)=>{

    let order=await Order.find({user:req.params.id}).populate('orderItems.product')
  
    res.json({message:'success',order})
})