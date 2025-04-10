import Rollbar from 'rollbar';

import { env } from '../env/env';

export const baseConfig: Rollbar.Configuration = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: env.NEXT_PUBLIC_DEPLOYMENT,
};

export const clientConfig = {
  accessToken: env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
  ...baseConfig,
};
