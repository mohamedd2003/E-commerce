import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title Is Required"],
      minLenght: [3, "Min Letters are 3"],
      maxLength: [50, "Max letters are 50"],
      unique: true,
      trim:true
    },
    slug: {
      type: String,
      minLenght: [3, "Min Letters are 3"],
      maxLength: [200, "Max letters are 200"],
      unique: true,
      index: true,
      trim:true

    },
  description:{
type:String,
minLenght: [3, "Min Letters are 3"],
maxLength: [500, "Max letters are 500"],
required:[true,'Description is required'],

  },
  sold:{
type:Number,
required:[true,"Sold Items is required"]
  },
  stock:{
    type:Number,
    required:[true,"Stock Items is required"]
      },
  imageCover:{
    url:String,
    public_id:String,
  
  },
  price:{
    type:Number,
    required:[true,"Price is Required"]
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true
    }
  }],
  category:{
    type:Types.ObjectId,
    ref:"Category"
  },
  subCategory:{
    type:Types.ObjectId,
    ref:"SubCategory"
  },
  brand:{
    type:Types.ObjectId,
    ref:"Brand"
  },
  rate_Count:Number,
  rate_Average:Number,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Product = model("Product", schema);
