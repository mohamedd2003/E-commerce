import * as yup from 'yup'

export const addCartSchema=yup.object({
   
    quantity:yup.number().required("Quantity is Required"),
    product: yup.string()
        .required("Product ID is required")
        .matches(/^[0-9a-fA-F]{24}$/, "Invalid Product Id format")

})
export const UpdateCartQuantitySchema=yup.object({
   
    quantity:yup.number().required("Quantity is Required"),
   
    

})
export const applyCouponSchema=yup.object({
   
   code:yup.string().required("Coupon Code is Required").min(5,"Coupon Must be at least 5 Characters")
   .max(30,"Coupon Code can't exceed 30 Character"),
   
    

})