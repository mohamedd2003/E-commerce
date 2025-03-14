import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Required"],
      minLenght: [3, "Min Letters are 3"],
      maxLength: [30, "Max letters are 30"],
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
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
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

export const SubCategory = model("SubCategory", schema);
