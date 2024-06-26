import axios from 'axios';
import { getAirtableLink } from '../airtableLink';
import env from './env';

export const slackAlert = async (message: string): Promise<void> => {
  console.log(`Sending Slack: ${message}`);

  return axios({
    method: 'post',
    baseURL: 'https://slack.com/api/',
    url: 'chat.postMessage',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.ALERTS_SLACK_BOT_TOKEN}`,
    },
    data: {
      channel: env.ALERTS_SLACK_CHANNEL_ID,
      text: message,
    },
  }).then((res) => {
    if (!res.data.ok) {
      console.error(`Error from Slack API: ${res.data.error}`);
    }
  }).catch((err) => {
    console.error(`Error from Slack API: ${err}`);
  });
};

export const getSlackAirtableLink = ({
  baseId, tableId, viewId, recordId,
}: { baseId: string, tableId: string, recordId: string, viewId?: string }) => {
  return `<${getAirtableLink({
    baseId, tableId, viewId, recordId,
  })}|View record in Airtable>`;
};
