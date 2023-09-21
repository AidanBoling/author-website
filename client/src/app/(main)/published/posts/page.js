'use client';
import Posts from '@/main/components/mainPages/Posts';
import PageWrapper from '@/main/components/PageWrapper';

export default function Page() {
    return <PageWrapper header="Posts" content={<Posts />} usePaper />;
}
