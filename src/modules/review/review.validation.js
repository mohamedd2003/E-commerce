import * as yup from 'yup'

export const addReviewSchema=yup.object({
   
    comment:yup.string().required("Comment Is required").min(3,"Comment Must Be at least 3 Characters").max(300," Comment Can't exceed 300 Chareacter"),
    rate:yup.number().required("Rate is Required"),
    product: yup.string()
        .required("Product ID is required")
        .matches(/^[0-9a-fA-F]{24}$/, "Invalid Product Id format")

})
export const UpdateReviewSchema=yup.object({
   
    comment:yup.string().min(3,"Comment Must Be at least 3 Characters").max(300," Comment Can't exceed 300 Chareacter"),
    rate:yup.number()
    

})