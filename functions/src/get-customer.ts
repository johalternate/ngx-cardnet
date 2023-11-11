import { onCall } from 'firebase-functions/v2/https';
import axios from 'axios';
import { CUSTOMER_URL, PRIVATE_KEY } from './constants';

export const getCustomer = onCall<number, unknown>(async (request) => {
  const customerId = request.data;
  const url = `${CUSTOMER_URL}/${customerId}`;
  const headers = { Authorization: `Basic ${PRIVATE_KEY}` };
  const call = await axios.get(url, { headers });
  const response = {
    errors: call.data.Errors,
    payload: call.data.Response,
  };
  return response;
});
