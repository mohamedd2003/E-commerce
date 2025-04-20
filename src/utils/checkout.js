import axios from "axios";
import dotenv from "dotenv";
import { authenticate } from "./authenticate.js";
dotenv.config();

const PAYMOB_URL = process.env.PAYMOB_URL;

// the docs for this API are here: https://docs.paymob.com/docs/accept-standard-redirect
export async function pay(billing_data, amount_cents) {
  // Authentication Request -- step 1 in the docs
  const accessToken = await authenticate();

  // Order Registration API -- step 2 in the docs
  const orderUrl = `${PAYMOB_URL}/ecommerce/orders`;
  const headers = {
    "Content-Type": "application/json",
  };
  const orderData = {
    auth_token: accessToken,
    delivery_needed: "false",
    amount_cents,
    currency: "EGP",
    
  };
  const order = await axios.post(orderUrl, orderData, { headers });
  const orderId = order.data.id;

  // Payment Key Request  -- step 3 in the docs
  const paymentKeyUrl = `${PAYMOB_URL}/acceptance/payment_keys`;

  const paymentKeyData = {
    auth_token: accessToken,
    amount_cents,
    expiration: 3600,
    order_id: orderId,
    billing_data,
    currency: "EGP",
    integration_id: process.env.PAYMOB_INTEGRATION_ID, // Replace with your integration id
  };
  const paymentKey = await axios.post(paymentKeyUrl, paymentKeyData, headers);
  return paymentKey.data.token;
}