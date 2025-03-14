import { model, Schema, Types } from "mongoose";

const schema=new Schema({
    comment:{
        type:String,
        required:[true,"comment Is Required"],
    },
    product:{
        type:Types.ObjectId,
        ref:"Product"
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    },
    rate:Number
},
{
    versionKey:false,
    timestamps: true
})

export const Review=model("Review",schema)