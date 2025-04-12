import { Router } from "express";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js";

const couponRouter=Router()
couponRouter.use(auth,allowedTo("admin"))
couponRouter.route('/')
.get(getAllCoupons)
.post(addCoupon)

couponRouter.route('/:id')
.put(updateCoupon).get(getCoupon).delete(deleteCoupon)


export default couponRouter