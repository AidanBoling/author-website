import { notFound } from 'next/navigation';
import { getById } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/PageWrapper';
import BookPage from '@/main/components/mainPages/BookPage';

// async function getItemById(id, resource) {
//     await fetch(`${BASE_URL}/${resource}/id/${id}`).then(res => {
//         if (!res.ok) {
//                         return undefined;
//         } else {            return res.json();
//         }
//     });
// };

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
