import {
  BookOpenIcon, CodeBracketIcon, PlayIcon, PlusIcon,
} from '@heroicons/react/24/outline';
import { ActionButton } from '../components/ActionButton';
import Button from '../components/Button';
import { Page } from '../components/Page';
import { H1 } from '../components/Text';
import { withAuth } from '../lib/client/withAuth';

const Home: React.FC = withAuth(({ setAuthState }) => {
  return (
    <Page>
      <div className="flex">
        <H1 className="flex-1">airtable-enforcer</H1>
        <Button onClick={() => { setAuthState(undefined); }}>Sign out</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ActionButton icon={PlayIcon} href="/run">
          Run
        </ActionButton>

        <ActionButton icon={BookOpenIcon} href="https://www.notion.so/bluedot-impact/Airtable-standards-18f7645898d447fbbd1139539d8b70ae?d=f9748e8b3199406eb78c0fa7bb5b088a">
          Read docs
        </ActionButton>

        <ActionButton icon={CodeBracketIcon} href="https://github.com/bluedotimpact/airtable-enforcer">
          View code
        </ActionButton>
      </div>
    </Page>
  );
});

export default Home;
