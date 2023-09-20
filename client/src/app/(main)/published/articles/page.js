'use client';
import PageWrapper from '../../components/PageWrapper';
import Articles from '../../components/pages/Articles';

export default function Page() {
    return <PageWrapper header="Articles" content={<Articles />} usePaper />;
}
