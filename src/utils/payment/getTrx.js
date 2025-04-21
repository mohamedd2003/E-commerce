import axios from "axios";
import { authenticate } from "./authenticate.js";
import dotenv from "dotenv"
dotenv.config()
const PAYMOB_URL = process.env.PAYMOB_URL;

// Function to fetch transaction details by ID from Paymob servers
export async function getTransactionById(transactionId) {
    // Authentication Request -- step 1 in the docs
    const accessToken = await authenticate();
    const url = `${PAYMOB_URL}/acceptance/transactions/${transactionId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, { headers });
// console.log(response.data);




      if(err)return next(new AppError(error.response.data)) 
    else{
  return response.data;
  
    }
}
