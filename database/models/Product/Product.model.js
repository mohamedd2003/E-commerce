import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title Is Required"],
      minLenght: [3, "Min Letters are 3"],
      maxLength: [50, "Max letters are 50"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug Is Required"],
      minLenght: [3, "Min Letters are 3"],
      maxLength: [200, "Max letters are 200"],
      unique: true,
      index: true,
    },
  description:{
type:String,
minLenght: [3, "Min Letters are 3"],
maxLength: [500, "Max letters are 500"],
required:[true,'Description is required'],

  },
  imageCover:{
    type:String,
    required:[true,"Image Cover is Required"]
  },
  images:{
    type:[String],
    required:[true,"Images are Required"]

  },
  category:{
    type:Types.ObjectId,
    ref:"Category"
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
