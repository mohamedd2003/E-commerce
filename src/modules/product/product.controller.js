import slugify from "slugify";
import { Product } from "../../../database/models/Product/Product.model.js";
import { deleteCloudinaryImage, replaceCloudinaryImage, uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import { ApiFeaturs } from "../../utils/apiFeaturs.js";

export const getAllProducts=catchError(async(req,res,next)=>{
    //====> Filter
  

 let apiFeature=new ApiFeaturs(Product.find(),req.query).pagination().filter().sort().search().fields()
    let products=await apiFeature.mongooseQuery
    let productsCount= products.length
    if(productsCount===0) return res.status(404).json({message:"There are no products Exist"})
    res.json({message:"Success",page:apiFeature.pageNumber, productsNumber:productsCount,products})
})

export const getProduct=catchError(async(req,res,next)=>{

    let product= await Product.findById(req.params.id)
    if(!product) return res.status(404).json({message:"There's product not found"})
    res.json({message:"Success",product})
})


export const addProduct=catchError(async(req,res,next)=>{

   
   
        
        req.body.images = await Promise.all(
            req.files.images.map(async (image) => {
                const { url, public_id } = await uploadToCloudinary(image.path, image.originalname);
                return { url, public_id };
            })
        );


       let imageCoverOriginalName=req.files.imageCover[0].originalname
       let imageCoverPath=  req.files.imageCover[0].path
       const{url,public_id}=await uploadToCloudinary(imageCoverPath,imageCoverOriginalName)
       req.body.imageCover={url,public_id}

    req.body.slug=slugify(req.body.title,{lower:true})
    let product= new Product(req.body)
    if(!product) return res.status(400).json({message:"Product is not created"})
    product.createdBy=req.user._id
    await product.save()
    
    res.json({message:"Success",product})
})


export const updateProduct=catchError(async(req,res,next)=>{
let {id}=req.params
let product= await Product.findById(id)
if(!product) return res.status(404).json({message:"Product not found"})
if(req.files){ 
    req.body.images = await Promise.all(
        req.files.images.map(async (image) => {
           const { url, public_id } =await replaceCloudinaryImage(image.path,...product.images.map(image=>image.public_id));
           return { url, public_id }
        }));
        if( req.body.imageCover){

            let imageCoverPath=  req.files.imageCover[0].path
            const{url,public_id}=await replaceCloudinaryImage(imageCoverPath,product.imageCover.public_id)
            req.body.imageCover={url,public_id}
        }
}
if(req.body.slug){

    req.body.slug=slugify(req.body.title,{lower:true})
}
let newProd=await Product.findByIdAndUpdate(id,req.body,{new:true})
res.json({message:"Success",newProd})
})

export const deleteProuct=catchError(async(req,res,next)=>{
    let {id}=req.params
    let product=await Product.findByIdAndDelete(id)
    if(!product) return res.status(404).json({message:"Product not found"})
   await deleteCloudinaryImage([product.imageCover.public_id,...product.images.map(image=>image.public_id)])
    res.json({message:'success'})
})