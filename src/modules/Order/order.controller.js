import { Cart } from "../../../database/models/Cart/cart.model.js";
import { Order } from "../../../database/models/Order/order.model.js";
import { Product } from "../../../database/models/Product/Product.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import axios from "axios"
import 'dotenv/config'
import { pay } from "../../utils/checkout.js";

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const IFRAME_ID = process.env.IFRAME_ID;

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

    let order = await Order.find({ user: req.params.id })
        .populate('orderItems.product')
        .populate({ path: 'user', select: 'name email' });
  let ordersCount=order.length
    res.json({message:'success',ordersCount,order})
})




export const createCheckOutSession = catchError(async (req, res, next) => {

  const cart = await Cart.findOne({ user: req.user._id });
       if (!cart)  return next(new AppError("No cart exists", 404))
         let totalCartPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
  const amountCents = totalCartPrice * 100;
 let billing_data={
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             email: req.user.email,
             phone_number: req.body.phoneNumber,
             country: "EG",
             city: req.body.city,
             street: req.body.street,
             building: req.body.building,
             floor: req.body.floor,
             apartment: req.body.apartment,
             state: req.body.state,
           }
    // get the payment token for this order
    const token = await pay(billing_data, amountCents);
  
    // create the payment link
    const link = `https://accept.paymob.com/api/acceptance/iframes/${process.env.IFRAME_ID}?payment_token=${token}`;
  
    // respond with the payment link
   res.json({message:'success',Payment_Link:link});
  if(err) return next(new AppError(err,400))
})
