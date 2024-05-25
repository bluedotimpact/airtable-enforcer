_This product is archived. This means we no longer use or develop it._

_NB: this product never fully worked, and was abandoned early because of problems (that remain at time of archiving) with the Airtable API. We are releasing it only in that it might serve as a useful starting point: but it requires significant work to get to a working state. If you do want to do that, you'll probably want to start in [lib/api/run.ts](./src/lib/api/run.ts)_

--

# airtable-enforcer

> **Warning**
> This app is not currently functioning due to some problems with the Airtable API.
> Airtable are addressing this in support tickets 00587506 and 00587526.
> Because of this, we abandoned this idea - most of the functionality here is not implemented.

An app that was intended to review our Airtable setup against our [standards](https://github.com/bluedotimpact/airtable-standards), and then poke people on Slack to get things fixed.

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
