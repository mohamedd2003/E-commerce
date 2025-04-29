import express from 'express'
import { dbconnection } from './database/dbconnection.js'
import { globalError } from './src/middlewares/Error/globalError.js'
import AppError from './src/utils/appError.js'
import { bootstrap } from './src/modules/bootstrap.js'
import cors from "cors"
import compression from "compression"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const port = process.env.port || 3000 

app.use(cors())
app.use(express.json())
bootstrap(app)

app.use(globalError)
app.use(compression())
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
  });
app.use("*",(req,res,next)=>{
    next(new AppError(`path ${req.originalUrl} Not Found`,404))
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))