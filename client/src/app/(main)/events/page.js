'use client';
import PageWrapper from '@/main/components/PageWrapper';
import Events from '@/main/components/mainPages/Events';

export default function Page() {
    return <PageWrapper header="Events" content={<Events />} usePaper />;
}
