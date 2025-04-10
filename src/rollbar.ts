import Rollbar from 'rollbar';

import { env } from './env/env';

const baseConfig: Rollbar.Configuration = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: env.DEPLOYMENT,
};

export const clientConfig = {
  accessToken: env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
  ...baseConfig,
};

export const serverInstance = new Rollbar({
  accessToken: env.ROLLBAR_SERVER_TOKEN,
  ...baseConfig,
});
