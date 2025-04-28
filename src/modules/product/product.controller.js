import slugify from "slugify";
import { Product } from "../../../database/models/Product/Product.model.js";
import { deleteCloudinaryImage, replaceCloudinaryImage, uploadToCloudinary } from "../../fileUpload/fileUplaod.js";
import { catchError } from "../../middlewares/Error/catchError.js";
import { ApiFeaturs } from "../../utils/apiFeaturs.js";
import xlsx from 'xlsx';
import AppError from "../../utils/appError.js";
import fs from 'fs';

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


export const addProductsFromExcel = catchError(async (req, res, next) => {
    if (!req.files || !req.files.excelFile || !req.files.excelFile[0]) {
      return next(new AppError("Excel file is required", 400));
    }
  
    const excelFile = req.files.excelFile[0]; // multer diskStorage يحطلك الملف كـ Array
    const filePath = excelFile.path;
  
    // اقرأ الملف من الـ path باستخدام fs
    const fileBuffer = fs.readFileSync(filePath);
  
    // اقرأ الـ workbook
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    
    // حدد الشيت
    const sheetName = workbook.SheetNames[0]; // انت كنت عامل sheetName غلط كنت سابه array مش تاخد منه اول عنصر
    const worksheet = workbook.Sheets[sheetName];
    
    // حوّل البيانات من الشيت ل JSON
    const productsData = xlsx.utils.sheet_to_json(worksheet);
    console.log(productsData);
  
    if (!productsData.length) {
      return next(new AppError("No products found in the Excel file", 400));
    }
  
    const createdProducts = [];
    const errors = [];
  
    for (const [index, productData] of productsData.entries()) {
      try {
        // تحقق من الحقول المطلوبة
        if (!productData.title || !productData.description || !productData.price) {
          errors.push(`Row ${index + 2}: Missing required fields`);
          continue;
        }
  
        // إنشاء slug من العنوان
        productData.slug = slugify(productData.title, { lower: true });
  
        // تعيين المستخدم الذي أنشأ المنتج
        productData.createdBy = req.user._id;
  
        // إنشاء المنتج وحفظه
        const product = new Product(productData);
        await product.save();
  
        createdProducts.push(product);
      } catch (error) {
        errors.push(`Row ${index + 2}: ${error.message}`);
      }
    }
  
    // احذف ملف الاكسل بعد ما تخلص (نظافة)
    fs.unlinkSync(filePath);
  
    if (errors.length && !createdProducts.length) {
      return res.status(400).json({
        message: "All products failed to create",
        errors
      });
    }
  
    res.json({
      message: errors.length ? "Products created with some errors" : "Products created successfully",
      createdCount: createdProducts.length,
      errorCount: errors.length,
      createdProducts,
      errors
    });
  });

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