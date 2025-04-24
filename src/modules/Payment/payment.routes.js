import { Router } from "express";
import { createCheckOutSession, refund, webhook } from "./payment.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";

const paymentRouter=Router()

paymentRouter.post("/checkOut",auth,createCheckOutSession)
paymentRouter.post("/refund",auth,refund)
paymentRouter.post("/webhook", webhook);
export default paymentRouter