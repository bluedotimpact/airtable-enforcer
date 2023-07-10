import { validateEnv } from '../validateEnv';

const envVars = [
  'AIRTABLE_PERSONAL_ACCESS_TOKEN',

  'SCHEDULER_API_KEY',

  'ALERTS_SLACK_CHANNEL_ID',
  'ALERTS_SLACK_BOT_TOKEN',

  'NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID'
] as const;

export type Env = Record<(typeof envVars)[number], string>;

const env: Env = validateEnv(process.env, envVars);

export default env;
