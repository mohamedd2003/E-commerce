import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Code is Required"],
      unique:true
    },
    expire_Date: {
      type: Date,
      required: [true, "Date is Required"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    discount:Number
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Coupoun = model("Coupoun", schema);
