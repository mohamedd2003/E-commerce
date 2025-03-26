import *as Yup from "yup"
import { Brand } from "../../../database/models/Brand/brand.model.js";

export const addBrandSchema=Yup.object({
    name:Yup.string().required("Brand name is required").min(2,"Brand Name must be at least 2 characters ")
    .test("unique-name", "Brand already exists", async (value) => {
        // Check if the username exists in the database
        const brand = await Brand.findOne({ name: value });
        return !brand; // Return true if the username is unique
    }),
    logo:Yup.object({
        url:Yup.string(),
        public_id:Yup.string()
    }).required()
})
export const UpdateBrandSchema=Yup.object({
    name:Yup.string().min(2,"Brand Name must be at least 2 characters "),
    logo:Yup.object({
        url:Yup.string(),
        public_id:Yup.string()
    })
})