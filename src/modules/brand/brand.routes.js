import { Router } from "express";
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "./brand.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { uploadSingleFile } from "../../fileUpload/fileUplaod.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addBrandSchema, UpdateBrandSchema } from "./brand.validation.js";

const brandRouter=Router()
brandRouter.post('/add',auth,allowedTo('admin'),uploadSingleFile('logo'),validationSchema(addBrandSchema),addBrand)
brandRouter.put('/update/:id',auth,allowedTo('admin'),uploadSingleFile('logo'),validationSchema(UpdateBrandSchema),updateBrand)
brandRouter.get('/allbrands',getAllBrands)
brandRouter.get('/:id',getBrandById)
brandRouter.delete('/:id',auth,allowedTo("admin"),deleteBrand)
export default brandRouter