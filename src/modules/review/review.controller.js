import { Product } from "../../../database/models/Product/Product.model.js";
import { Review } from "../../../database/models/review/review.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";

export const getAllReviews=catchError(async(req,res,next)=>{
    let reviews=await Review.find()
    console.log(reviews);
    
    let reviewsCount=reviews.length
    if(reviewsCount===0) return next(new AppError("There's no Reviews",404))
        res.json({message:'Success',count:reviewsCount,reviews})
})
export const getReview=catchError(async(req,res,next)=>{
    let {id}=req.params
    let review=await Review.findById(id)
    if(reviewCount===0) return(new AppError("There's no Reviews",404))
        res.json({message:'Success',review})
})


export const addReview=catchError(async(req,res,next)=>{
    let{product}=req.body
    
    
    let existProd=await Product.findById(product)
    if(!existProd)return next(new AppError("Product Not Exist",404))

        let oneReview= await Review.findOne({createdBy:req.user._id,product})
        console.log(req.user._id);
        
        if(oneReview) return next(new AppError("You can Only Add one comment for this product"))
        req.body.createdBy=req.user._id
    let review=new Review(req.body)
    await review.save()
    res.json({message:"success",review})
})

export const deleteReview=catchError(async(req,res,next)=>{
    let {id}=req.params
    let deletedReview=await Review.findByIdAndDelete(id)
    if(!deletedReview)return next(new AppError("No Review Exist",404))
    res.json({message:'success'})
    
})


export const UpdateReview=catchError(async(req,res,next)=>{
    let{id}=req.params
    let fields=["comment",'rate']
    Object.keys(req.body).forEach(key=>{
        if(!fields.includes(key))
            {
                return next(new AppError("You can only Edit comment or rate"))
        }
})
    let newReview=await Review.findByIdAndUpdate(id,req.body,{new:true})
    if(!newReview)return next(new AppError("No Review Exist",404))
    res.json({message:'success',newReview})
})