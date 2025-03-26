import { Router  } from "express";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "./category.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { uploadSingleFile } from "../../fileUpload/fileUplaod.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import {  addCategorySchema } from "./category.validation.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
const categoryRouter=Router()

categoryRouter.post('/addcategory',auth,allowedTo('admin'),uploadSingleFile('image'),validationSchema(addCategorySchema),addCategory)//add
categoryRouter.put('/updatecategory/:id',auth,allowedTo('admin'),uploadSingleFile('image'),updateCategory)
categoryRouter.delete('/deletecategory/:id',auth,allowedTo('admin'),deleteCategory)
categoryRouter.get('/categories',getAllCategories)
export default categoryRouter