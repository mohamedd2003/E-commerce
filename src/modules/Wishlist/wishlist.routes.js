import { Router } from "express";
import { addProductToWishlist, getUserWishlist } from "./wishlist.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";

const wishlistRouter=Router()

wishlistRouter.route('/').patch(auth,allowedTo("user",'admin'),addProductToWishlist)
.get(auth,allowedTo("user",'admin'),getUserWishlist)
export default wishlistRouter