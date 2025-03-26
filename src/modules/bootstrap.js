import authRouter from "./Auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./Category/category.routes.js"
import productRouter from "./product/product.routes.js"
import userRouter from "./User/user.routes.js"

export const bootstrap=(app)=>{
    app.use('/api/category',categoryRouter)
    app.use('/api/user',userRouter)
    app.use('/api/brand',brandRouter)
    app.use('/api/auth',authRouter)
    app.use('/api/user',userRouter)
    app.use('/api/product',productRouter)
}