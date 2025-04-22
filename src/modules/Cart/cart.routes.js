import { Router } from "express";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addToCart, applyCoupon, clearCart,  getUserLoggedCart,  removeProductFromCart, updateCartQuantity } from "./cart.controller.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addCartSchema, applyCouponSchema, UpdateCartQuantitySchema } from "./cart.validation.js";

const cartRouter=Router()

cartRouter.route("/")
.post(auth,allowedTo("user"),validationSchema(addCartSchema),addToCart)
.delete(auth,allowedTo("user"),clearCart)
.get(auth,allowedTo("user",'admin'),getUserLoggedCart)


cartRouter.route("/:id")
.patch(auth,allowedTo("user"),validationSchema(UpdateCartQuantitySchema),updateCartQuantity)
.delete(auth,allowedTo("user"),removeProductFromCart)

cartRouter.post('/applyCoupon',auth,allowedTo("user"),validationSchema(applyCouponSchema),applyCoupon)

export default cartRouter