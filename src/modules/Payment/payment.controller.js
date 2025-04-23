import { Cart } from "../../../database/models/Cart/cart.model.js";
import dotenv from "dotenv"
import { pay } from "../../utils/payment/checkout.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import { getTransactionById } from "../../utils/payment/getTrx.js";
import { refundTransaction } from "../../utils/payment/refundTrx.js";
import { Order } from "../../../database/models/Order/order.model.js";
dotenv.config();

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
      const token = await pay(billing_data, amountCents,req.user._id);
    
      // create the payment link
      const link = `https://accept.paymob.com/api/acceptance/iframes/${process.env.IFRAME_ID}?payment_token=${token}`;
    
      // respond with the payment link
      await Cart.findByIdAndDelete(cart._id)
     res.json({message:'success',Payment_Link:link});
    if(err) return next(new AppError(err,400))
  })


  export const refund=catchError(async (req, res, next) => {
    try {
      // Get the transaction id from the request body
      const { transactionId } = req.body;
  
      // Get the transaction details from paymob
      const transaction = await getTransactionById(transactionId);
  
      // Refund the transaction
      const refunded = await refundTransaction(
        transactionId,
        transaction.amount_cents
      );
  
      // respond with the refunded transaction details
      return res.status(200).send(refunded);
    } catch (error) {
  console.log(error)

      return res.status(400).json(error);
    }

  })




 
  

  export const webhook=catchError(async(req,res,next)=>{

//     let cart= await Cart.findById(req.params.id)
//     if(!cart) return next(new AppError("Cart Not Found",404))
//     let totalOrderPrice=cart.totalCartPriceAfterDiscount||cart.totalCartPriceS
// await Payment.insertOne({user:req.user._id,amount:totalOrderPrice})


//     let order= new Order({
//         user:req.user._id,
//         orderItems:cart.cartItems,
//         totalOrderPrice,
//         shippingAddress:{
//             city:req.body.city,
//             street:req.body.street,
//             phone:req.body.phone
//         },
//         paymentType:"visa",
//         isPaid:true


//     })
//     await order.save()

//     let options=cart.cartItems.map((prod)=>{
//         return(
//             {
//                 updateOne:{
//                     "filter":{_id:prod.product},
//                     "update":{$inc:{sold:prod.quantity,stock:-prod.quantity}}
//                 }
//             }
//         )
//     })

//     await Product.bulkWrite(options)
// res.json({message:"success",order})
    const data = req.body;
  
    console.log("📦 Received Paymob callback:", data);
  
    // مثال: لو عايز تتأكد أن العملية ناجحة وتعمل update في الداتا بيز
    if (data.success === true && data.obj?.order?.merchant_order_id) {
      const merchantOrderId = data.obj.order.merchant_order_id;
  
      // هنا تقدر تبحث عن الأوردر وتحدث حالته مثلاً:
      // await Order.findOneAndUpdate({ merchantOrderId }, { status: "paid" });
  
      console.log(`✅ Order ${merchantOrderId} paid successfully`);
    } else {
      console.log("❌ Transaction failed or still pending");
    }
  
   return  res.status(200).send("Received"); // لازم ترجع 200 علشان Paymob ماتعيدش الإرسال
   
   
})
  