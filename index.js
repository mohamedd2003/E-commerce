import express from 'express'
import { dbconnection } from './database/dbconnection.js'
import { globalError } from './src/middlewares/Error/globalError.js'
import AppError from './src/utils/appError.js'
import { bootstrap } from './src/modules/bootstrap.js'
const app = express()
const port = 3000 

app.use(express.json())
bootstrap(app)

app.use(globalError)
app.use("*",(req,res,next)=>{
    next(new AppError(`path ${req.originalUrl} Not Found`,404))
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))