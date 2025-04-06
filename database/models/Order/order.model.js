import { date } from "joi";
import { model, Schema, Types } from "mongoose";


const schema= new Schema({
shippingAddress:{
    city:String,
    street:String,
    phone:Number
},
orderItems:[
    {
        Product:{type:Types.ObjectId,ref:'Product'},
        quantity:Number,
        price:Number
    }
],
totalOrderPrice:Number,
paymentType:{
    type:String,
    enum:['cash','card'],
    default:'cash'
},
paidAt:Date,
deliveredAt:Date,
isPaid:{
    type:Boolean,
    default:false
},
isDelivered:{
    type:Boolean,
    default:false
},


})

const Order=model("Order",schema)

