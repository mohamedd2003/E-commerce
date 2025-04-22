import slugify from "slugify";
import { Category } from "../../../database/models/Category/category.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import mongoose from "mongoose";
import {  deleteCloudinaryImage, replaceCloudinaryImage, uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
import { ApiFeaturs } from "../../utils/apiFeaturs.js";

export const addCategory=catchError(async(req,res,next)=>{
  
    
    
    let{path,originalname}=req.file
    const {url,public_id}=await uploadToCloudinary(path,originalname)
    req.body.image={ url,public_id }

  
    req.body.slug=slugify(req.body.name,{lower:true})
    req.body.createdBy=req.user.id


    let category= new Category(req.body)
  await  category.save()
  res.json({message:'Success',category})
})


export const updateCategory=catchError(async(req,res,next)=>{
let{id}=req.params

let existCategory=await Category.findById(id)
if(!existCategory)return next(new AppError(`Category With id:(${id})Not Found`))
     
    const validFields=['name',"image"]
          Object.keys(req.body).forEach((field) => {
              if (!validFields.includes(field)) {
                  return next(new AppError(`You are not allowed to update ${field}`, 400));
              }
          });
          if(req.body.name){
            req.body.slug=slugify(req.body.name,{lower:true})
          }
          const{url,public_id} =    await replaceCloudinaryImage(req.file.path,existCategory.image.public_id)
          req.body.image={ url,public_id }
  let category= await Category.findByIdAndUpdate(id,req.body,{new:true})
  if(!category)return next(new AppError(`Category With id:(${id})Not Found`))
    else{
      res.json({message:'Success',category})
    }
})

export const deleteCategory=catchError(async(req,res,next)=>{
let{id}=req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError(`Invalid Category ID: ${id}`, 400));
  }
  let category= await Category.findByIdAndDelete(id)
  if(!category)return next(new AppError(`Category With id:(${id})Not Found`,404))
  await deleteCloudinaryImage(category.image.public_id)
 
  
   
      res.json({message:'Success'})
    
})

export const getAllCategories=catchError(async(req,res,next)=>{

  let apiFeaturs=new ApiFeaturs(Category.find(),req.query).pagination().filter().sort().search().fields()
      let categories=await apiFeaturs.mongooseQuery
let categoryCount=categories.length
 if(categoryCount===0)return next(new AppError("There are not Categories in DataBase",404))
  res.json({message:'success',page:apiFeaturs.pageNumber,count:categoryCount,categories})
})
export const getcategory=catchError(async(req,res,next)=>{

let{id}=req.params
let category= await Category.findById(id)
if(!category) return next(new AppError("category Not Found",404))
  res.json({message:'success',category})
})