import slugify from "slugify";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import { deleteCloudinaryImage, replaceCloudinaryImage, uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
import { Brand } from "../../../database/models/Brand/brand.model.js";

export const addBrand=catchError(async(req,res,next)=>
{
  
     
  let{path,originalname}=req.file
  const {url,public_id} = await uploadToCloudinary(path,originalname)
  req.body.logo = {url,public_id,};
  req.body.slug=slugify(req.body.name,{lower:true})
req.body.createdBy=req.user.id

    let brand= new Brand(req.body)
   await brand.save()

   res.json({message:"Success",brand})

})

export const updateBrand=catchError(async(req,res,next)=>{
        let{id}=req.params
    let existBrand= await Brand.findById(id)
    const validFields=['name',"logo"]
    Object.keys(req.body).forEach((field) => {
        if (!validFields.includes(field)) {
            return next(new AppError(`You are not allowed to update ${field}`, 400));
        }
    });
    if(req.body.name){
        req.body.slug=slugify(req.body.name,{lower:true})
    }
    
 const{url,public_id} =await  replaceCloudinaryImage(req.file.path,existBrand.logo.public_id)
    req.body.logo = {url,public_id,};
    let brand= await Brand.findByIdAndUpdate(id,req.body,{new:true})
    if(!brand) return next(new AppError("Brand not found",404))

res.json({message:'Succcess',brand})

})


export const getAllBrands=catchError(async(req,res,next)=>{
    let brands=await Brand.find()
    if(!brands) return next(new AppError("There are no brands exist",404))
    let brandsCount=await Brand.countDocuments()
    res.json({message:'Success',brandsCount,brands})
})


export const getBrandById=catchError(async(req,res,next)=>{
    let brand=await Brand.findById(req.params.id)
if (!brand) return next(new AppError('Brand Not Exist',404))
    res.json({message:'Success',brand})
})

export const deleteBrand=catchError(async(req,res,next)=>{
    let brand=await Brand.findByIdAndDelete(req.params.id)
    if(!brand) return next(new AppError("Brand Not Found",404))
        await deleteCloudinaryImage(brand.logo.public_id)
    res.json({message:"success"})
})