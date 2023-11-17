import { Suspense } from 'react';
import { EventListSkeleton } from '@/main/components/skeletons/EventPageSkeleton';
import PageWrapper from '@/main/components/layout/PageWrapper';
import { preloadGetList } from '@/main/api/getResourceItems';
import Events from '@/main/components/mainPages/Events';
import EventsList from '@/main/components/lists/EventsList';

export const revalidate = 300; // 10800; // 3 hrs

export default function Page() {
    preloadGetList('events');

    return (
        <PageWrapper header="Events">
            <Events>
                <Suspense fallback={<EventListSkeleton />}>
                    <EventsList />
                </Suspense>
            </Events>
        </PageWrapper>
    );
}
