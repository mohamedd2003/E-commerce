import { Router } from "express";
import orderRouter from "../Order/order.routes";

const userRouter = Router();
export default userRouter
// Sub-router for orders
userRouter.use('/:id/orders', orderRouter);

// 🟢 Specific routes FIRST
userRouter.get('/allUsers', auth, allowedTo('admin'), getAlluser);
userRouter.post('/add', auth, allowedTo('admin'), checkEmailExist, uploadSingleFile("image"), validationSchema(addUserSchema), addUser);

// 🟡 Then dynamic routes
userRouter.delete('/:id', auth, allowedTo('admin'), validationSchema(deleteUserSchema), deleteUser);
userRouter.put('/:id', auth, allowedTo('admin'), validationSchema(updateUserSchema), updateUser);
userRouter.get('/:id', auth, allowedTo('admin'), getUserById);
