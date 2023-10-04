import { Suspense } from 'react';
import { getList } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/PageWrapper';
import Books from '@/main/components/mainPages/Books';
import BooksList from '@/main/components/BooksList';
import { ResourcesListSkeleton } from '../../../../main/components/skeletons/LoadingResourcesListPage';

// async function GetBooks() {

//     return (

//     );
// }

export default async function Page() {
    const queryResults = await getList('books');

    return (
        <PageWrapper header="Books">
            <Suspense fallback={<ResourcesListSkeleton />}>
                <Books books={queryResults.items} />
            </Suspense>
        </PageWrapper>
    );
}
