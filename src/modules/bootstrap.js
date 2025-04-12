import addressRouter from "./Address/address.routes.js"
import authRouter from "./Auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./Cart/cart.routes.js"
import categoryRouter from "./Category/category.routes.js"
import orderRouter from "./Order/order.routes.js"
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
    app.use('/api/address',addressRouter)
    app.use('/api/cart',cartRouter)
    app.use('/api/order',orderRouter)
}