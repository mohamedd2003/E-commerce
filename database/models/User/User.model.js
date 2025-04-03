import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Required"],
      minLength: [3, "Min Letters are 3"],
      maxLength: [50, "Max letters are 30"],
      trim:true,
      unique:false
   
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      minLenght: [8, "Min Letters are 3"],
      maxLength: [50, "Max letters are 200"],
      unique: true,
      trim:true

   
      
    },
    password:{
        type:String,
        required: [true, "Email Is Required"],
        minLenght: [8, "Min characters are 8"],
    
    },
    role:{
        type:String,
        enum:['admin',"user"],
        default:"user",
        trim:true
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
    },
    passwordChangedAt:Date,
    image:{
      url:String,
      public_id:String,
      
    },
    wishlist:[{
      type:Types.ObjectId,
      ref:"Product"
    }],
    addresses:[{
      phone:String,
      city:String,
      street:String
    }]//will Make _id because it's Obj
  
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.pre("save", function(){
 this.password= bcrypt.hashSync(this.password,12)
})
schema.pre("findOneAndUpdate", function(){
  if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,12)
})
export const User = model("User", schema);
