import slugify from "slugify";
import { SubCategory } from "../../../database/models/SubCategory/SubCategory.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import { Category } from "../../../database/models/Category/category.model.js";

export const addSubCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name,{lower:true})
    let catergoryId=req.body.category
    let category=await Category.findById(catergoryId)
    if(!category) return next(new AppError("Category Not Exist",404))
    let subcategory= new SubCategory(req.body)
await subcategory.save()
res.json({message:"success",Sub_Category:subcategory})
})
export const getAllSubCategories=catchError(async(req,res,next)=>{
  
    let subCategories= await SubCategory.find({category:req.params.id}).populate("category")

    if(!subCategories) return next(new AppError("SubCategories Not Found",404))

    let subCategoriesCount=subCategories.length
    if(subCategoriesCount==0) return res.status(404).json({message:"No SubCategories Found"})
res.json({message:'success',subCategoriesCount,subCategories})
})
export const getSubCategory=catchError(async(req,res,next)=>{
  
    let subCategory= await SubCategory.findById(req.params.id).populate("category createdBy")
    if(!subCategory) return next(new AppError("SubCategory Not Found",404))

res.json({message:'success',subCategory})
})

export const deleteSubCategory=catchError(async(req,res,next)=>{
  
    let subCategory= await SubCategory.findByIdAndDelete(req.params.id)
    if(!subCategory) return next(new AppError("SubCategory Not Found",404))
res.json({message:'success',subCategory})
})
export const updateSubCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name,{lower:true})
    let subCategory= await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!subCategory) return next(new AppError("SubCategory Not Found",404))
res.json({message:'success',subCategory})
})