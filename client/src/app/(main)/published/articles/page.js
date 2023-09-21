// 'use client';
import PageWrapper from '@/main/components/PageWrapper';
import Articles from '@/main/components/mainPages/Articles';

export default function Page() {
    return <PageWrapper header="Articles" content={<Articles />} usePaper />;
}
