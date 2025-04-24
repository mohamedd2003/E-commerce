import * as YUP from "yup"

export const checkoutSchema=YUP.object({
    first_name: YUP.string().required('first_name is Required').min(3, "first_name must be at least 3 characters"),
    last_name: YUP.string().required('last_name is Required').min(3, "last_name must be at least 3 characters"),
    phoneNumber: YUP.string().required('phoneNumber is Required').matches(/^[0-9]{11}$/, "phoneNumber must be 11 digits"),
    building: YUP.number().required('building is Required').positive("building must be a positive number").integer("building must be an integer"),
    street: YUP.string().required('street is Required'),
    city: YUP.string().required('city is Required'),
    floor: YUP.number().required('floor is Required').integer("floor must be an integer"),
    apartment: YUP.number().required('apartment is Required').integer("apartment must be an integer"),
    state: YUP.string().required('state is Required')
})