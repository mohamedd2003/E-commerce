import { Router } from "express";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { changePassword, Login, register } from "./auth.controller.js";
import { checkEmailExist } from "../../middlewares/Email/checkEmailExist.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { uploadSingleFile } from "../../fileUpload/fileUplaod.js";

const authRouter=Router()

authRouter.route('/register').post(checkEmailExist,uploadSingleFile('image'),validationSchema(registerSchema),register)
authRouter.route('/login').post(validationSchema(loginSchema),Login)
authRouter.route('/change-password').patch(auth,changePassword)
export default authRouter