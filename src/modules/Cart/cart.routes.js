import { Router } from "express";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addToCart, clearCart,  getUserLoggedCart,  removeProductFromCart, updateCartQuantity } from "./cart.controller.js";

const cartRouter=Router()

cartRouter.route("/").post(auth,allowedTo("user"),addToCart).delete(auth,allowedTo("user"),clearCart)
.get(auth,allowedTo("user",'admin'),getUserLoggedCart)
cartRouter.route("/:id").patch(auth,allowedTo("user"),updateCartQuantity).delete(auth,allowedTo("user"),removeProductFromCart)
export default cartRouter