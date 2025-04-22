import { Router  } from "express";
import { addCategory, deleteCategory, getAllCategories, getcategory, updateCategory } from "./category.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { uploadSingleFile } from "../../fileUpload/fileUplaod.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import {  addCategorySchema } from "./category.validation.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import subCategoryRouter from "../SubCatergory/subCategory.routes.js";
const categoryRouter=Router()
categoryRouter.use("/:id/subcategory",subCategoryRouter)
categoryRouter.post('/',auth,allowedTo('admin'),uploadSingleFile('image'),validationSchema(addCategorySchema),addCategory)//add
categoryRouter.put('/:id',auth,allowedTo('admin'),uploadSingleFile('image'),updateCategory)
categoryRouter.delete('/:id',auth,allowedTo('admin'),deleteCategory)
categoryRouter.get('/:id',getcategory)
categoryRouter.get('/',getAllCategories)
export default categoryRouter