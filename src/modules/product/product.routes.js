import { Router } from "express";
import { addProduct, deleteProuct, getAllProducts, getProduct, updateProduct } from "./product.controller.js";
import { uploadMixFiles } from "../../fileUpload/fileUplaod.js";
import { auth } from "../../middlewares/Auth/auth.js";
import { allowedTo } from "../../middlewares/Auth/allowedTo.js";
import { addProductSchema, updateProductSchema } from "./product.validation.js";
import { validationSchema } from "../../middlewares/validation/validationSchema.js";
const productRouter=Router()
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getProduct)
productRouter.post('/addProduct',auth,allowedTo('admin'),uploadMixFiles([ { name: 'images', maxCount: 5 },{name:"imageCover",maxCount:1}]),validationSchema(addProductSchema),addProduct)
productRouter.put('/update/:id',auth,allowedTo('admin'),uploadMixFiles([ { name: 'images', maxCount: 5 },{name:"imageCover",maxCount:1}]),validationSchema(updateProductSchema),updateProduct)
productRouter.delete('/delete/:id',auth,allowedTo('admin'),deleteProuct)
export default productRouter