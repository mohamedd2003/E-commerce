import { Cart } from "../../../database/models/Cart/cart.model.js"
import { Coupon } from "../../../database/models/coupon/coupon.model.js"
import { Product } from "../../../database/models/Product/Product.model.js"
import { catchError } from "../../middlewares/Error/catchError.js"
import AppError from "../../utils/appError.js"
let calcTotalPrice=(isExist)=>{
    isExist.totalCartPrice= isExist.cartItems.reduce((prev,item)=>prev+=item.quantity*item.price,0)

}

export const addToCart=catchError(async(req,res,next)=>{
let isExist=await Cart.findOne({user:req.user._id})
let product=await Product.findById(req.body.product)
if(!product)return next(new AppError("Product Not Found",404))
    if(req.body.quantity>product.stock)return next(new AppError("Not enough stock available for the requested quantity", 400))

    req.body.price=product.price
    req.body.productName=product.title


if(!isExist){
    let cart=new Cart({
        user:req.user._id,
        cartItems:[req.body]
    })
    calcTotalPrice(cart)
    await cart.save()


    res.json({message:'success',cart})
}else{
    let item=isExist.cartItems.find(item=>item.product==req.body.product)
 
  
    
    if(item){
        if(req.body.quantity+item.quantity>product.stock)return next(new AppError("Not enough stock available for the requested quantity", 400))
        item.quantity += req.body.quantity || 1
    calcTotalPrice(isExist)
    }
    if(!item){
        isExist.cartItems.push(req.body)
        calcTotalPrice(isExist)
    }
        await isExist.save()

    res.json({message:'success',Cart:isExist})
}
})



export const updateCartQuantity=catchError(async(req,res,next)=>{
    let existCart=await Cart.findOne({user:req.user._id})
    let cart= existCart.cartItems.find(item=>item.product==req.params.id)
    if(!cart)return next(new AppError("Product Not Found",404))
    
    
        let product=await Product.findById(req.params.id)
if(!product)return next(new AppError("Product Not Found",404))
    if(req.body.quantity>product.stock)return next(new AppError("Not enough stock available for the requested quantity", 400))


   cart.quantity=req.body.quantity
calcTotalPrice(existCart)
   await existCart.save()
   res.json({message:'success',cart})
})

export const removeProductFromCart=catchError(async(req,res,next)=>{
    let existCart=await Cart.findOne({user:req.user._id})
    let cart= existCart.cartItems.find(item=>item.product==req.params.id)
    if(!cart)return next(new AppError("Product Not Found",404))

   await cart.deleteOne()
   calcTotalPrice(existCart)
   await existCart.save()
   res.json({message:"success",cart:existCart})
})
export const clearCart=catchError(async(req,res,next)=>{
    let existCart=await Cart.findOneAndDelete({user:req.user._id})
   res.json({message:"success"})
})

export const getUserLoggedCart=catchError(async(req,res,next)=>{
    let cart=await Cart.findOne({user:req.user._id}).populate(["cartItems.product" ,"user"])
    if(!cart) return next(new AppError("Cart Not Found",404))
    res.json({message:"success",cart})

})
export const applyCoupon=catchError(async(req,res,next)=>{
    let coupon=await Coupon.findOne({code:req.body.code,expire_Date:{$gtl:Date.now()}})
    if(!coupon) return next(new AppError("Oops Invalid Coupon"))
        let cart=await Cart.findOne({user:req.user._id})
    cart.totalCartPriceAfterDiscount=cart.totalCartPrice-(cart.totalCartPrice*coupon.discount)/100
    cart.discount=coupon.discount
    await cart.save()
    res.json({message:'success',cart})
})