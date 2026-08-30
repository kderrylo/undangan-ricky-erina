import { Suspense } from 'react';
import InvitationApp from '@/components/InvitationApp';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InvitationApp />
    </Suspense>
  );
}
