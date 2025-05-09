import { Coupon } from "../../../database/models/coupon/coupon.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import { CronJob } from 'cron';


export const addCoupon = catchError(async (req, res, next) => {
    
    let isExist = await Coupon.findOne({ code: req.body.code });
    if (isExist) return next(new AppError("Coupon Already Exist"));
  
    req.body.createdBy = req.user._id;
  
   if (new Date(req.body.expire_Date).getTime() < Date.now()) return next(new AppError("Expire_Date Must Be in Future"));
    let coupon = new Coupon(req.body);
    await coupon.save();
  
    res.json({ message: 'success', coupon });
  });
  
export const getAllCoupons=catchError(async(req,res,next)=>{
    let coupons=await Coupon.find().populate("createdBy","-password")
    let couponsCount=coupons.length
  if(!coupons || couponsCount==0)return next(new AppError("No Coupons Exist",404))
    res.json({message:"success",couponsCount,coupons})  

})
export const getCoupon=catchError(async(req,res,next)=>{
    let coupon=await Coupon.findById(req.params.id).populate("createdBy","-password")
    coupon ||  next(new AppError("No Coupouns Exist",404))
    !coupon || res.json({message:'success',coupon})    
})
export const updateCoupon=catchError(async(req,res,next)=>{
    if (new Date(req.body.expire_Date).getTime() < Date.now()) return next(new AppError("Expire_Date Must Be in Future"));

    let coupon=await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon ||  next(new AppError("No Coupouns Exist",404))
    !coupon || res.json({message:'success',coupon})    
})
export const deleteCoupon=catchError(async(req,res,next)=>{
    let coupon=await Coupon.findByIdAndDelete(req.params.id)
    coupon ||  next(new AppError("No Coupouns Exist",404))
    !coupon || res.json({message:'success'})    
})



const job = new CronJob(
    '0 0 0 * * *', // cronTime (runs every day at 12:00 AM)
    
	async function () {
        let time = Date.now()
        await Coupon.deleteMany({ expire_Date: { $lt: time } });
		
	}
);
job.start();
