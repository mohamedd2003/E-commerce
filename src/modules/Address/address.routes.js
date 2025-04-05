import { Router } from "express";

import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addAddressSchema } from "./address.validation.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addAddress, getAllUserAddresses, removeAdrress } from "./address.controller.js";


const addressRouter=Router()
addressRouter.route('/').post(auth,allowedTo('user'),validationSchema(addAddressSchema),addAddress).get(auth,allowedTo('user',"admin"),getAllUserAddresses)
addressRouter.route('/:id').delete(auth,allowedTo('user','admin'),removeAdrress)
// .put(auth,allowedTo("user",'admin'),validationSchema(updateAddressSchema),updateAddress)

export default addressRouter