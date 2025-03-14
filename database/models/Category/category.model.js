import { model, Schema, Types } from "mongoose";

const schema=new Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"],
        minLenght:[3,"Min Letters are 3"],
        maxLength:[30,"Max letters are 30"],
        unique:true
    
    },
    slug:{
        type:String,
        required:[true,"Slug Is Required"],
        minLenght:[3,"Min Letters are 3"],
        maxLength:[200,"Max letters are 200"],
        unique:true,
        index:true
    },
    image:{
        type:String,
        required:[true,"Image Is Required"],
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    }
    

},
{
    versionKey:false,
    timestamps: true
})

export const Category=model("Category",schema)