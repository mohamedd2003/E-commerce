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
    email: {
      type: String,
      required: [true, "Email Is Required"],
      minLenght: [8, "Min Letters are 3"],
      maxLength: [50, "Max letters are 200"],
      unique: true,
      index: true,
    },
    password:{
        type:String,
        required: [true, "Email Is Required"],
        minLenght: [8, "Min characters are 8"],
    },
    role:{
        type:String,
        enum:['admin',"user"],
        default:"user"
    },
    is_deleted:{
        type:Boolean,
        default:false,
    },
    is_blocked:{
        type:Boolean,
        default:false,
    },
    confirm_email:{
        type:Boolean,
        default:false,
    }
  
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("User", schema);
