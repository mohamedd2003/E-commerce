import { Router } from "express";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addCouponSchema, UpdateCouponSchema } from "./coupon.validation.js";

const couponRouter=Router()
couponRouter.use(auth,allowedTo("admin"))
couponRouter.route('/')
.get(getAllCoupons)
.post(validationSchema(addCouponSchema),addCoupon)

couponRouter.route('/:id')
.put(validationSchema(UpdateCouponSchema),updateCoupon).get(getCoupon).delete(deleteCoupon)


export default couponRouter