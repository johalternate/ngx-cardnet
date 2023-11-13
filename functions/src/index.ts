import { setGlobalOptions } from 'firebase-functions/v2/options';
import { config } from './config';

setGlobalOptions(config);

export * from './add-customer';
export * from './get-customer';
export * from './delete-payment-profile';
