import PageWrapper from '@/main/components/PageWrapper';
import BookPage from '@/main/components/mainPages/BookPage';

export default function Page() {
    return <PageWrapper content={<BookPage />} usePaper />;
}
