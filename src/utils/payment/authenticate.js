import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Set your Paymob API token
const API_TOKEN = process.env.PAYMOB_API_KEY;
const PAYMOB_URL =process.env.PAYMOB_URL;


// Authenticate with Paymob to get an access token
export async function authenticate() {
  try {
    const url = `${PAYMOB_URL}/auth/tokens`;
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      api_key: API_TOKEN,
     
    };
    const response = await axios.post(url, data, { headers });
    const accessToken = response.data.token;
    return accessToken;
  } catch (error) {
    console.error("Error authenticating:", error.response.data);
  }
}