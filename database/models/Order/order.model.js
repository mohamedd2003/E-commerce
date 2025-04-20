import { model, Schema, Types } from "mongoose";


const schema= new Schema({
    user:{type:Types.ObjectId,ref:'User'},
shippingAddress:{
    city:String,
    street:String,
    phone:Number
},
orderItems:[
    {
        product:{type:Types.ObjectId,ref:'Product'},
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
Paymob_OrderId:{
    type:Number
}


})

export const Order=model("Order",schema)

