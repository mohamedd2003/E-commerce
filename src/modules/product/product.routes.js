import { Router } from "express";
import { addProduct, addProductsFromExcel, deleteProuct, getAllProducts, getProduct, updateProduct } from "./product.controller.js";
import { uploadMixFiles, uploadSingleFile } from "../../fileUpload/fileUplaod.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addProductSchema, updateProductSchema } from "./product.validation.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
const productRouter=Router()
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getProduct)
productRouter.post('/addProduct',auth,allowedTo('admin'),uploadMixFiles([ { name: 'images', maxCount: 5 },{name:"imageCover",maxCount:1}]),validationSchema(addProductSchema),addProduct)
productRouter.post('/addProductfromexcel',auth,allowedTo("admin"),uploadMixFiles([ { name: 'excelFile', maxCount: 1 }]),addProductsFromExcel)
productRouter.put('/update/:id',auth,allowedTo('admin'),uploadMixFiles([ { name: 'images', maxCount: 5 },{name:"imageCover",maxCount:1}]),validationSchema(updateProductSchema),updateProduct)
productRouter.delete('/delete/:id',auth,allowedTo('admin'),deleteProuct)
export default productRouter