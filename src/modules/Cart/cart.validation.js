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