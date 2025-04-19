import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";

const subCategoryRouter=Router({mergeParams:true})

subCategoryRouter.route("/")
.get(getAllSubCategories)
.post(auth,allowedTo("admin"),addSubCategory)
subCategoryRouter.route("/:id")
.get(getSubCategory)
.put(auth,allowedTo("admin"),updateSubCategory)
.delete(auth,allowedTo("admin"),deleteSubCategory)
export default subCategoryRouter