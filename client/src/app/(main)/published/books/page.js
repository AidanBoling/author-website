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

export default async function Page({ searchParams }) {
    const queryResults = await getList('books', searchParams);
    const { items, ...pageInfo } = queryResults;
    // console.log('Articles page results: ', pageInfo);

    return (
        <PageWrapper header="Books" pagination={pageInfo}>
            <Suspense fallback={<ResourcesListSkeleton />}>
                <Books books={items} />
            </Suspense>
        </PageWrapper>
    );
}
