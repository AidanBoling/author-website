'use client';
import PageWrapper from '../../../components/PageWrapper';
import BookPage from '../../../components/pages/BookPage';

export default function Page() {
    return <PageWrapper content={<BookPage />} usePaper />;
}
