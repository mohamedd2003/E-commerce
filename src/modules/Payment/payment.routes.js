import { Router } from "express";
import { createCheckOutSession, postPayCallback, refund } from "./payment.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";

const paymentRouter=Router()

paymentRouter.post("/checkOut",auth,createCheckOutSession)
paymentRouter.post("/refund",auth,refund)
paymentRouter.post("/webhook", postPayCallback);
export default paymentRouter