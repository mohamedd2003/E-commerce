import { Router } from "express";
import { createCheckOutSession, refund } from "./payment.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";

const paymentRouter=Router()

paymentRouter.post("/checkOut",auth,createCheckOutSession)
paymentRouter.post("/refund",auth,refund)
export default paymentRouter