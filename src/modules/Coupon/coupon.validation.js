import * as yup from 'yup'

export const addCouponSchema=yup.object({
   
    // {
    //     "code":"C33ee",
    //     "expire_Date":"04/13/2025",
    //     "discount":50
    // }
code:yup.string().required("Coupon Code is Required").min(5,"Coupon Must be at least 5 Characters")
.max(30,"Coupon Code can't exceed 30 Character"),
expire_Date:yup.date().required("expire_Date is Required"),
discount:yup.number().required("discount Is required")
})
export const UpdateCouponSchema=yup.object({
   
    code:yup.string().min(5,"Coupon Must be at least 5 Characters")
    .max(15,"Coupon Code can't exceed 15 Character"),
    expire_Date:yup.date(),
   
    

})