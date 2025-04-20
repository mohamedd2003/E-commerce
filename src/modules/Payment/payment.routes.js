import { Router } from "express";
import { createCheckOutSession } from "./payment.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";

const paymentRouter=Router()

paymentRouter.post("/checkOut",auth,createCheckOutSession)
export default paymentRouter