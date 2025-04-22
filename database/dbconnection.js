import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export  const dbconnection=connect(process.env.MONGO_URI)
.then(()=>console.log("Db connected Successfully"))
.catch((err)=>console.log(err,"there's an error connecting Db"))