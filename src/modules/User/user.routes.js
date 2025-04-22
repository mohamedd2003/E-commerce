import { Router } from "express";
import { auth } from "../../middlewares/Auth/auth.js";
import { addUser, deleteUser, getAlluser, getUserById, updateUser } from "./user.controller.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { uploadSingleFile } from "../../fileUpload/fileUplaod.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addUserSchema, deleteUserSchema, updateUserSchema } from "./user.validation.js";
import orderRouter from "../Order/order.routes.js";
import { checkEmailExist } from "../../middlewares/Email/checkEmailExist.js";
const userRouter=Router()
userRouter.use('/:id/orders', orderRouter);

// 🟢 Specific routes FIRST
userRouter.get('/allUsers', auth, allowedTo('admin'), getAlluser);
userRouter.post('/add', auth, allowedTo('admin'), checkEmailExist, uploadSingleFile("image"), validationSchema(addUserSchema), addUser);

// 🟡 Then dynamic routes
userRouter.delete('/:id', auth, allowedTo('admin'), validationSchema(deleteUserSchema), deleteUser);
userRouter.put('/:id', auth, allowedTo('admin'), validationSchema(updateUserSchema), updateUser);
userRouter.get('/specificUser/:id', auth, allowedTo('admin'), getUserById);
export default userRouter
