import * as Yup from 'yup'

export const addProdToWishListSchema=Yup.object({
    product: Yup.string()
    .required('Product ID is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid product Id '),
});
