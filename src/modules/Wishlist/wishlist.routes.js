import { Router } from "express";
import { addProductToWishlist, getUserWishlist } from "./wishlist.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addProdToWishListSchema } from "./wishlist.validation.js";

const wishlistRouter=Router()
wishlistRouter.use(auth,allowedTo("user",'admin'))
wishlistRouter.route('/').patch(validationSchema(addProdToWishListSchema),addProductToWishlist)
.get(getUserWishlist)
export default wishlistRouter