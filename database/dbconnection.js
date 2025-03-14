import { connect } from "mongoose";

export  const dbconnection=connect("mongodb://localhost:27017/e-commerce")
.then(()=>console.log("Db connected Successfully"))
.catch(()=>console.log("there's an error connecting Db"))