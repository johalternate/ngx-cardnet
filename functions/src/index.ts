import { setGlobalOptions } from 'firebase-functions/v2/options';

setGlobalOptions({ maxInstances: 2 });

export * from './add-customer';
export * from './get-customer';
