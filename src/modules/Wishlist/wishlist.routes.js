import { Router } from "express";
import { addProductToWishlist, deleteProductFromWishlist } from "./wishlist.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";

const wishlistRouter=Router()

wishlistRouter.route('/').patch(auth,allowedTo("user",'admin'),addProductToWishlist)
.delete(auth,allowedTo("user",'admin'),deleteProductFromWishlist)
export default wishlistRouter