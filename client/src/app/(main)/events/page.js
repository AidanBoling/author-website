'use client';
import PageWrapper from '../components/PageWrapper';
import Events from '../components/pages/Events';

export default function Page() {
    return <PageWrapper header="Events" content={<Events />} usePaper />;
}
