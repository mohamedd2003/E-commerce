import * as Yup from "yup"
import { Product } from '../../../database/models/Product/Product.model.js';
export const addProductSchema=Yup.object({
        title:Yup.string().required("Title is required").min(3,"Title must be at least 3 characters").max(100,"Title must be at most 100 characters")
        .test("unique","Title must be unique",async(value)=>{
            let product= await Product.findOne({title:value})
            return !product 
        }),
        description:Yup.string().required("Description is required").min(10,"Description must be at least 10 characters").max(2000,"Description must be at most 2000 characters"),
        price:Yup.number().required("Price is required").min(0,"Price must be at least 0").max(1000000,"Price must be at most 1000000"),
        stock:Yup.number().required("Stock is required").min(0,"Stock must be at least 0").max(1000000,"Stock must be at most 1000000"),
        sold:Yup.number().required("Sold is required").min(0,"Sold must be at least 0").max(1000000,"Sold must be at most 1000000"),
        imageCover: Yup.mixed()
        .nullable()
        .test('fileRequired', 'Image cover is required', (value) => {
            return value && value.length > 0;
        }),
    
    images: Yup.array()
        .nullable()
        .min(1, 'At least one image is required')
        .max(5, 'Maximum 5 images allowed')
        
    }
)
export const updateProductSchema=Yup.object({
        title:Yup.string().min(3,"Title must be at least 3 characters").max(100,"Title must be at most 100 characters")
        .test("unique","Title must be unique",async(value)=>{
            let product= await Product.findOne({title:value})
            return !product 
        }),
        description:Yup.string().min(10,"Description must be at least 10 characters").max(2000,"Description must be at most 2000 characters"),
        price:Yup.number().min(0,"Price must be at least 0").max(1000000,"Price must be at most 1000000"),
        stock:Yup.number().min(0,"Stock must be at least 0").max(1000000,"Stock must be at most 1000000"),
        sold:Yup.number().min(0,"Sold must be at least 0").max(1000000,"Sold must be at most 1000000"),
        
    }
)

