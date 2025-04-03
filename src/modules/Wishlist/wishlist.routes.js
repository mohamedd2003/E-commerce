import { Router } from "express";
import { addProductToWishlist, deleteProductFromWishlist, getUserWishlist } from "./wishlist.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";

const wishlistRouter=Router()

wishlistRouter.route('/').patch(auth,allowedTo("user",'admin'),addProductToWishlist)
.delete(auth,allowedTo("user",'admin'),deleteProductFromWishlist)
.get(auth,allowedTo("user",'admin'),getUserWishlist)
export default wishlistRouter