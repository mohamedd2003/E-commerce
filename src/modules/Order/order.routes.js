import { Router } from "express";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { createCashOrder, createVisaOrder, getAllOrders, getLoggedUserOrders } from "./order.controller.js";

const orderRouter=Router({mergeParams:true})

orderRouter.route("/").get(auth,allowedTo("user","admin"),getLoggedUserOrders)
orderRouter.route("/:id").post(auth,allowedTo("user"),createCashOrder)
orderRouter.route("/card/:id").post(auth,allowedTo("user"),createVisaOrder)
orderRouter.route("/").get(auth,allowedTo("admin"),getAllOrders)
export default orderRouter