import { notFound } from 'next/navigation';
import { getById } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/layout/PageWrapper';
import BookPage from '@/main/components/mainPages/BookPage';

export default async function Page({ params }) {
    const book = await getById(params.id, 'books');
    if (!book) {
        notFound();
    }

    return (
        <PageWrapper>
            <BookPage book={book} />
        </PageWrapper>
    );
}
