import { User } from "../../../database/models/User/User.model.js";
import { deleteCloudinaryImage, uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";

export const addUser=catchError(async(req,res,next)=>{
    let{path,originalname}=req.file
    const{url,public_id}=await uploadToCloudinary(path,originalname)
    req.body.image={url,public_id}
    let newUser=new User(req.body)

   await newUser.save()
newUser.password=undefined
   res.json({message:'success',newUser})

})

export const getAlluser=catchError(async(req,res,next)=>{
    
    let allUsers=await User.find({role:"user"}).select("-password")
    let userCount=await User.countDocuments()
    res.json({message:'success',NumberOfsers:userCount,allUsers})
})
export const getUserById=catchError(async(req,res,next)=>{
    
    let allUsers=await User.findById(req.params.id).select("-password")
    res.json({message:'success',allUsers})
})
export const updateUser=catchError(async(req,res,next)=>{
    let allowedFields=['name',"email",'role']
    Object.keys(req.body).forEach(key=>{
                  if (!allowedFields.includes(key)) {
                      return next(new AppError(`You are not allowed to update ${key}`, 401));
                  }
              })
    let user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).select("-password")
    if(!user)return next(new AppError('User Not Found',404))
    res.json({message:'success',user})
})
export const deleteUser=catchError(async(req,res,next)=>{
    let user=await User.findById({_id:req.params.id})
    if(!user)return next(new AppError("User Not found "))
        if(user.role==="admin")return next(new AppError("You can't delete admin"))
            user.deleteOne()
        await user.save()
        await deleteCloudinaryImage(user.image.public_id)
    res.json({message:'success'})
})