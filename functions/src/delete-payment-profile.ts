import { onCall } from 'firebase-functions/v2/https';
import axios from 'axios';
import { CUSTOMER_URL, PRIVATE_KEY } from './constants';
import { DeletePaymentProfileRequest } from './models/delete-payment-profile-request';

export const deletePaymentProfile = onCall<
  DeletePaymentProfileRequest,
  unknown
>(async (request) => {
  const customerId = request.data.customerId;
  const url = `${CUSTOMER_URL}/${customerId}/PaymentProfileDelete`;
  const headers = { Authorization: `Basic ${PRIVATE_KEY}` };
  const body = { PaymentProfileId: request.data.profileId };
  const call = await axios.post(url, body, { headers });
  const response = {
    errors: call.data.Errors,
    payload: call.data.Response,
  };
  return response;
});
