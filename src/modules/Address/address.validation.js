import * as Yup from "yup"
export const addAddressSchema=Yup.object({
    city:Yup.string().required("City Name is required").min(3,"City Name Must be At least 3 Characters")
    .max(30,"City Name shouldn't exceed 30 Characters"),
    phone:Yup.string().required("Phone Number Is Required").min(11,"You Should Enter EGY number must be 11 Digit").max(11,"You Should Enter EGY number not exceed 11 Digit"),
    street:Yup.string().required("Street Name is Required").min(5,"Street Name Must be At least 3 Characters").max(250,"Street Name shouldn't exceed 250 Characters")
})
// export const updateAddressSchema=Yup.object({
//     city:Yup.string().min(3,"City Name Must be At least 3 Characters")
//     .max(30,"City Name shouldn't exceed 30 Characters"),
//     phone:Yup.string().min(11,"You Should Enter EGY number must be 11 Digit").max(11,"You Should Enter EGY number not exceed 11 Digit"),
//     street:Yup.string().min(5,"Street Name Must be At least 3 Characters").max(250,"Street Name shouldn't exceed 250 Characters")
// })