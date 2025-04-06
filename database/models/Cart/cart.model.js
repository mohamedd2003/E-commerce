import { model, Schema, Types } from "mongoose"

const schema=new Schema({
    user:{type:Types.ObjectId,ref:"User"},
    cartItems:[
  {  product:{type:Types.ObjectId,ref:"Product"},
    quantity:{type:Number,default:1},
    price:{type:Number},
    productName:String
}
],
totalCartPrice:Number,
totalCartPriceAfterDiscount:Number,
discount:Number
},{timestamps:true,versionKey:false})

export const Cart=model("Cart",schema)