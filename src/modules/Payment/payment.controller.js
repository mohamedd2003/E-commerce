import { Cart } from "../../../database/models/Cart/cart.model.js";
import dotenv from "dotenv"
import { pay } from "../../utils/payment/checkout.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import { getTransactionById } from "../../utils/payment/getTrx.js";
import { refundTransaction } from "../../utils/payment/refundTrx.js";
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
       res.json({message:"success",refunded});
  
    if(err) return next(new AppError(err))
  })
  