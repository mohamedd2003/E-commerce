import { Router } from "express";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { createCashOrder, getAllOrders, getLoggedUserOrders } from "./order.controller.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { createOrderSchema } from "./order.validation.js";

const orderRouter=Router({mergeParams:true})

orderRouter.route("/").get(auth,allowedTo("user","admin"),getLoggedUserOrders)
orderRouter.route("/:id").post(auth,allowedTo("user"),validationSchema(createOrderSchema),createCashOrder)
// orderRouter.route("/card/:id").post(auth,allowedTo("user"),validationSchema(createOrderSchema),createVisaOrder)
orderRouter.route("/").get(auth,allowedTo("admin"),getAllOrders)
export default orderRouter