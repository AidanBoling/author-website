'use client';
import PageWrapper from '../../../components/PageWrapper';
import PostPage from '../../../components/pages/PostPage';

export default function Page() {
    return <PageWrapper content={<PostPage />} usePaper />;
}
