import { Suspense } from 'react';
import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';
import PageWrapper from '@/main/components/PageWrapper';
import { getList } from '@/main/api/getResourceItems';
import Events from '@/main/components/mainPages/Events';
import EventsList from '@/main/components/EventsList';

async function GetEventsList() {
    const events = await getList('events');

    return (
        <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
            <EventsList events={events} />
        </Suspense>
    );
}

export default function Page() {
    return (
        <PageWrapper header="Events">
            <Events>
                <GetEventsList />
            </Events>
        </PageWrapper>
    );
}
