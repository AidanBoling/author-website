import { Suspense } from 'react';
import { getList, getListPaginated } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/layout/PageWrapper';
import PagePagination from '@/main/components/layout/PagePagination';
import { pageLimitOptions } from '@/main/utils/pageLimitOptions';
import Books from '@/main/components/mainPages/Books';
import { ResourcesListSkeleton } from '@/main/components/skeletons/LoadingResourcesListPage';
// export const revalidate = 300;

async function FetchBooksList({ page, limit, params }) {
    const queryResults = await getListPaginated('books', page, limit, params);
    const { items } = queryResults;
    return <Books books={items} />;
}

// async function FetchBooksListPages({page, params, children}) {
//     const queryResults = await getListPaginated('books', page, params);
//     const { items } = queryResults;
//     return (
//         <Books books={items} />
//     );
// }

export default async function Page({ searchParams }) {
    const { page, limit, ...params } = searchParams;
    const currentPage = (page && Number(page)) || 1;
    const pageLimit = (limit && Number(limit)) || pageLimitOptions[0];

    const queryResults = await getListPaginated(
        'books',
        currentPage,
        pageLimit,
        params
    );
    const { items, ...pageInfo } = queryResults;
    // console.log('Articles page results: ', pageInfo);

    return (
        <PageWrapper header="Books">
            <Suspense
                key={currentPage + pageLimit + params}
                fallback={<ResourcesListSkeleton />}>
                <FetchBooksList
                    page={currentPage}
                    limit={pageLimit}
                    params={params}
                />
            </Suspense>
            <PagePagination pagination={pageInfo} />
        </PageWrapper>
    );
}
