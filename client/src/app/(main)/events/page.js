import { Suspense } from 'react';
import { EventListSkeleton } from '@/main/components/skeletons/EventPageSkeleton';
import PageWrapper from '@/main/components/layout/PageWrapper';
import { preloadGetList } from '@/main/api/getResourceItems';
import Events from '@/main/components/mainPages/Events';
import EventsList from '@/main/components/lists/EventsList';

export const dynamic = 'force-dynamic'; // Temporary workaround for NextJS bug -- 304 response for static pages with revalidate
export const revalidate = 300; // 10800; // 3 hrs

export default function Page() {
    preloadGetList('events');

    return (
        <PageWrapper header="Speaking & Consultations">
            <Events>
                <Suspense fallback={<EventListSkeleton />}>
                    <EventsList />
                </Suspense>
            </Events>
        </PageWrapper>
    );
}
