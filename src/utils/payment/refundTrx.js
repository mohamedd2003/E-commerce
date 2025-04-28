import axios from "axios";
import { authenticate } from "./authenticate.js";
import dotenv from "dotenv";

dotenv.config();

// Set your Paymob API token
const API_TOKEN = process.env.PAY_API;
const PAYMOB_URL =process.env.PAYMOB_URL;

// Function to refund a transaction
export async function refundTransaction(transactionId, refundAmount) {
  try {
    // Authentication Request -- step 1 in the docs
    const accessToken = await authenticate();
    const url = `${PAYMOB_URL}/acceptance/void_refund/refund`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      auth_token: API_TOKEN,
      transaction_id: transactionId,
      amount_cents: refundAmount,
    };

    const response = await axios.post(url, data, { headers });
    console.log(response.data);

    return response.data;

  } catch (error) {
    console.log(error);

    // If the error has a response from the server (like status 400)
    if (error.response && error.response.data) {
      return { success: false, message: error.response.data.message };
    }

    // If it's some other error (like network issue)
    return { success: false, message: error.message || 'Something went wrong' };
  }
}

