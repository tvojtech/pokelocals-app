import Rollbar from 'rollbar';

import { env } from '../env/env';
import { baseConfig } from './client';

export const rollbarServer = new Rollbar({
  accessToken: env.ROLLBAR_SERVER_TOKEN,
  ...baseConfig,
});
