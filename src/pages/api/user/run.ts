import type { NextApiRequest, NextApiResponse } from 'next';
import createHttpError from 'http-errors';
import run from '../../../lib/api/run';
import { apiRoute } from '../../../lib/api/apiRoute';

export type RunRequest = {
  installationId: string
};

export type RunResponse = {
  status: string
};

export default apiRoute(async (
  req: NextApiRequest,
  res: NextApiResponse<RunResponse>,
) => {
  if (!('installationId' in req.body) || typeof req.body.installationId !== 'string') {
    throw new createHttpError.BadRequest('Missing installation id');
  }
  
  await run();

  res.status(200).json({ status: 'Complete' });
});
