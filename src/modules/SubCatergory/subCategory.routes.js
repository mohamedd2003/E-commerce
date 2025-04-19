import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
import { addSubCategorySchema } from "./subcategory.validation.js";

const subCategoryRouter=Router({mergeParams:true})

subCategoryRouter.route("/")
.get(getAllSubCategories)
.post(auth,allowedTo("admin"),validationSchema(addSubCategorySchema),addSubCategory)
subCategoryRouter.route("/:id")
.get(getSubCategory)
.put(auth,allowedTo("admin"),updateSubCategory)
.delete(auth,allowedTo("admin"),deleteSubCategory)
export default subCategoryRouter