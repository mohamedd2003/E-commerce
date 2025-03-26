import slugify from "slugify";
import { Product } from "../../../database/models/Product/Product.model.js";
import { uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";

export const getAllProducts=catchError(async(req,res,next)=>{

    let products= await Product.find()
    let productsCount= await Product.countDocuments()
    if(products.length===0) return res.status(404).json({message:"There are no products Exist"})
    res.json({message:"Success",productsNumber:productsCount,products})
})

export const getProduct=catchError(async(req,res,next)=>{

    let product= await Product.findById(req.params.id)
    if(!product) return res.status(404).json({message:"There's product not found"})
    res.json({message:"Success",product})
})


export const addProduct=catchError(async(req,res,next)=>{
 req.files.images.map(async(image)=>{
  const{url}=await uploadToCloudinary(image.path,image.originalname)
req.body.images=url
  });

let imageCoverOriginalName=  req.files.imageCover[0].originalname
let imageCoverPath=  req.files.imageCover[0].path
const{url}=await uploadToCloudinary(imageCoverPath,imageCoverOriginalName)
req.body.imageCover=url
req.body.slug=slugify(req.body.name,{lower:true})
    let product= new Product(req.body)
    await product.save()
    // if(products.length===0) return res.status(404).json({message:"There are no products Exist"})
    // res.json({message:"Success",productsNumber:productsCount,products})
})