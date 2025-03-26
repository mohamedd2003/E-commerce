import { Router } from "express";
import { addProduct, getAllProducts, getProduct } from "./product.controller.js";
import { uploadMixFiles } from "../../fileUpload/fileUplaod.js";
const productRouter=Router()
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getProduct)
productRouter.post('/addProduct',uploadMixFiles([{ name: 'images', maxCount: 5 },{name:"imageCover",maxCount:1}]),addProduct)
export default productRouter