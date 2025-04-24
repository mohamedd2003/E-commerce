import { Router } from "express";
import { createCheckOutSession, refund, webhook } from "./payment.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { checkoutSchema } from "./payment.validation.js";

const paymentRouter=Router()

paymentRouter.post("/checkOut",auth,allowedTo("user"),validationSchema(checkoutSchema),createCheckOutSession)
paymentRouter.post("/refund",auth,allowedTo("admin"),refund)
paymentRouter.post("/webhook", webhook);
export default paymentRouter