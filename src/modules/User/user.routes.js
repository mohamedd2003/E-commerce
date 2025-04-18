import { Router } from "express";
import { auth } from "../../middlewares/Auth/auth.js";
import { addUser, deleteUser, getAlluser, getUserById, updateUser } from "./user.controller.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { uploadSingleFile } from "../../fileUpload/fileUplaod.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addUserSchema, deleteUserSchema, updateUserSchema } from "./user.validation.js";
import orderRouter from "../Order/order.routes.js";
const userRouter=Router()
userRouter.use('/:id/orders',orderRouter)
userRouter.post('/add',auth,allowedTo('admin'),validationSchema(addUserSchema),uploadSingleFile("image"),addUser)//Add
userRouter.get('/all',auth,allowedTo('admin'),getAlluser)
userRouter.get('/:id',auth,allowedTo('admin'),getUserById)
userRouter.delete('/:id',auth,allowedTo('admin'),validationSchema(deleteUserSchema),deleteUser)
userRouter.put('/:id',auth,allowedTo('admin'),validationSchema(updateUserSchema),updateUser)
export default userRouter