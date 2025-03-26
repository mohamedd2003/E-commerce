import { User } from "../../../database/models/User/User.model.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import AppError from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
export const register = catchError(async (req, res, next) => {
  let{path,originalname}=req.file
  const{url,public_id}=uploadToCloudinary(path,originalname)
  req.body.image={url,public_id}
  let user = new User(req.body);
  await user.save();
  user.password = undefined;
  res.status(201).json({ message: "success", User: user });
});

export const Login = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("Email Not Found", 404));
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("Email or password is incorrect", 401));
  else {
    jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "MYSECRETKEY",
      (err, token) => {
        err ? next(new AppError(err)) : res.json({ message: "success", token });
      }
    );
  }
});

export const changePassword = catchError(async (req, res, next) => {
  let { oldPassword } = req.body;
  let match = bcrypt.compareSync(oldPassword, req.user.password);
  if (!match || ! req.user) return next(new AppError("old Password not correct", 401));
  let user = await User.findByIdAndUpdate(req.user.id, {
    password: req.body.newPassword,
    passwordChangedAt: Date.now(),
  });
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY,
    (err, token) => {
      res.json({ message: "Success", token });
    }
  );


});
