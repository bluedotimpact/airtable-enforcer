# airtable-enforcer ![deployment manual](https://img.shields.io/badge/deployment-manual-critical)

> **Warning**
> This app is not currently functioning due to some problems with the Airtable API.
> Airtable are addressing this in support tickets 00587506 and 00587526.

An app that reviews our Airtable setup against our standards, and then pokes people on Slack to get things fixed.

## How it works

Every day, a cron job set up in GitHub Actions hits an endpoint:

```
POST /api/scheduler/run
```

This runs the Vercel Serverless Function defined by [run.ts](./src/pages/api/scheduler/run.ts).

It reviews our Airtable setup against our standards, and then pokes people on Slack to get things fixed. It identifies the person responsible for fixing it by looking up who the owner is, defaulting back to Adam Jones.

## Developer setup

1. Clone this repository
2. Install Node
3. Install dependencies with `npm install`
4. Create an [Airtable personal access token](https://support.airtable.com/docs/creating-and-using-api-keys-and-access-tokens) with the scope 'schema.bases:read'.
5. Set the environment variables in [`.env.local`](./.env.local)
6. Run the server with `npm start`

## Deployment

This app is deployed using Vercel. API keys are stored safely in Vercel environment variables. GitHub Actions hits the scheduler endpoint.

To deploy a new version, simply commit to the master branch. GitHub Actions automatically handles CD, via `npm run deploy:prod`.
