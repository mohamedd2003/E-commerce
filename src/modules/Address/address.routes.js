import { Router } from "express";

import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addAddressSchema } from "./address.validation.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addAddress, removeAdrress } from "./address.controller.js";


const addressRouter=Router()
addressRouter.use(auth,allowedTo('user'))
addressRouter.route('/').post(validationSchema(addAddressSchema),addAddress)
addressRouter.route('/:id').delete(removeAdrress)
// .get(getUserWishlist)
export default addressRouter