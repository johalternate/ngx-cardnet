import { GlobalOptions } from 'firebase-functions/v2/options';

export const config: GlobalOptions = {
  enforceAppCheck: true,
  maxInstances: 2,
};
