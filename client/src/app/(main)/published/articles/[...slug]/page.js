'use client';
import PageWrapper from '../../../components/PageWrapper';
import ArticlePage from '../../../components/pages/ArticlePage';

export default function Page() {
    return <PageWrapper content={<ArticlePage />} usePaper />;
}
