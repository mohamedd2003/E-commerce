import { Router } from "express";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getLoggedUserOrders } from "./order.controller.js";

const orderRouter=Router({mergeParams:true})
orderRouter.post("/checkOut",auth,createCheckOutSession)
orderRouter.route("/").get(auth,allowedTo("user","admin"),getLoggedUserOrders)
orderRouter.route("/:id").post(auth,allowedTo("user"),createCashOrder)
orderRouter.route("/").get(auth,allowedTo("admin"),getAllOrders)
export default orderRouter