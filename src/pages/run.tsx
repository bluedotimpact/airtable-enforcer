import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import axios, { AxiosResponse } from 'axios';
import useAxios from 'axios-hooks';
import { useState } from 'react';
import Button from '../components/Button';
import Link from '../components/Link';
import { Page } from '../components/Page';
import { H1 } from '../components/Text';
import { AuthState } from '../lib/client/authState';
import { withAuth } from '../lib/client/withAuth';
import { RunResponse } from './api/scheduler/run';
import { RunRequest } from './api/user/run';

const Run: React.FC = withAuth(({ authState }) => {
  const [runState, setRunState] = useState<
  | { type: 'loading' }
  | { type: 'success' }
  | { type: 'failure', message: string }
  | undefined
  >();

  return (
    <Page>
      <Link href="/" className="flex flex-row gap-2 mb-4 text-gray-600 hover:text-gray-800"><ArrowUturnLeftIcon className="h-5 w-5" /> Back home</Link>
      <H1>Run bot</H1>
      {runState?.type === 'success' && <p>Last run: Success</p>}
      {runState?.type === 'failure' && <p>Last run: Failure: {runState.message}</p>}
      <Button
        onClick={async () => {
          setRunState({ type: 'loading' });
          try {
            await axios.request<RunResponse, AxiosResponse<RunResponse>, RunRequest>({
              method: 'post',
              url: '/api/user/run',
              headers: { authorization: `Bearer ${authState.token}` },
            });
            setRunState({ type: 'success' });
          } catch (err) {
            setRunState({ type: 'failure', message: err instanceof Error ? err.message : String(err) });
          }
        }}
        disabled={runState?.type === 'loading'}
      >
        {runState?.type === 'loading' ? 'Running...' : 'Run'}
      </Button>
    </Page>
  );
});

export default Run;
