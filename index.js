import express from 'express'
import { dbconnection } from './database/dbconnection.js'
const app = express()
const port = 3000
dbconnection
app.use(express.json())
app.listen(port, () => console.log(`Example app listening on port ${port}!`))