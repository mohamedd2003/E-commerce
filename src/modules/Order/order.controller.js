import { Cart } from "../../../database/models/Cart/cart.model.js";
import { Order } from "../../../database/models/Order/order.model.js";
import { Product } from "../../../database/models/Product/Product.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import axios from "axios"
import 'dotenv/config'

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






  export const createCheckOutSession=catchError(async(req,res,next)=>{
    
   
    // 1. Check if user has a cart
    const cart = await Cart.findOne({ user:req.user._id });
    if (!cart)return next(new AppError("NO Cart Exist",404))

    let totalCartPrice=cart.totalCartPriceAfterDiscount|| cart.totalCartPrice
  
    const amountCents = totalCartPrice * 100;
    try {
      // 2. Authenticate with Paymob
      const authResponse = await axios.post("https://accept.paymob.com/api/auth/tokens", {
        api_key: PAYMOB_API_KEY,
      });
      const authToken = authResponse.data.token;
  
      // 3. Generate Payment Key
      const paymentKeyResponse = await axios.post(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          auth_token: authToken,
          amount_cents: amountCents,
          currency: "EGP",
          billing_data: { // ✅ REQUIRED
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            email:req.user.email,
            phone_number:req.body.phoneNumber,
            country: "EG", // 2-letter country code
            city: req.body.city,
            street: req.body.street,
            building: req.body.building,
            floor: req.body.floor,
            apartment: req.body.apartment,
            state:req.body.state
          },
 
          integration_id: INTEGRATION_ID,
        }
      );
  
      const paymentToken = paymentKeyResponse.data.token;
  
      // 4. Create hosted payment URL
      const paymentURL = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentToken}`;
  
      res.status(200).json({ url: paymentURL });
    } catch (err) {
      console.error("Paymob Error:", err.response?.data || err.message);
      res.status(500).json({ error: "Payment initialization failed." });
    }
  })

