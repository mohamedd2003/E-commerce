import authRouter from "./Auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./Category/category.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import userRouter from "./User/user.routes.js"
import wishlistRouter from "./Wishlist/wishlist.routes.js"

export const bootstrap=(app)=>{
    app.use('/api/category',categoryRouter)
    app.use('/api/user',userRouter)
    app.use('/api/brand',brandRouter)
    app.use('/api/auth',authRouter)
    app.use('/api/user',userRouter)
    app.use('/api/product',productRouter)
    app.use('/api/review',reviewRouter)
    app.use('/api/wishlist',wishlistRouter)
}