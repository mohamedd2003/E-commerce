import { Router } from "express";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addToCart } from "../../../database/models/Cart/cart.controller.js";

const cartRouter=Router()

cartRouter.route("/").post(auth,allowedTo("user"),addToCart)
export default cartRouter