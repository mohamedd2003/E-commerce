import * as Yup from "yup"

export const createOrderSchema=Yup.object({
    city:Yup.string().required("City Name is Required")
    .min(3,"City Name Must be at least 3 Characters")
    .max(30,"City name shouldn't exceed 30 Character"),

    street:Yup.string().required("street Name is Required")
    .min(3,"street Name Must be at least 3 Characters")
    .max(80,"street name shouldn't exceed 80 Character"),
    Phone:Yup.string().required("phone Number is Required")
    .min(11,"phone Number Must be 11 Digit")
    .max(11,"phone number Must be 11 Digit")
})