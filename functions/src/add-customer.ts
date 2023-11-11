import { onCall } from 'firebase-functions/v2/https';
import axios from 'axios';
import { CUSTOMER_URL, PRIVATE_KEY } from './constants';
import { Customer } from './models';

export const addCustomer = onCall<Partial<Customer>>(async (request) => {
  const customer = request.data;
  const url = `${CUSTOMER_URL}`;
  const headers = { Authorization: `Basic ${PRIVATE_KEY}` };
  const call = await axios.post(url, customer, { headers });
  const response = {
    errors: call.data.Errors,
    payload: call.data.Response,
  };
  return response;
});
