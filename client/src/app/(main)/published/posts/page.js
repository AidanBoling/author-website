'use client';
import Posts from '../../components/pages/Posts';
import PageWrapper from '../../components/PageWrapper';

export default function Page() {
    return <PageWrapper header="Posts" content={<Posts />} usePaper />;
}
