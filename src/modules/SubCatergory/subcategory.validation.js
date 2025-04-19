
import * as Yup from "yup"
import { Category } from "../../../database/models/Category/category.model.js";

export const addSubCategorySchema=Yup.object({
    name:Yup.string().min(3,"Category Name should be at least 3 Characters")
    .max(50,"Category Name should not exceed 50 Characters").required()
    .test("unique-name", "Category already exists", async (value) => {
        // Check if the username exists in the database
        const category = await Category.findOne({ name: value });
        return !category; // Return true if the username is unique
    }),
})