import { Suspense } from 'react';
import { getListPaginated } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/layout/PageWrapper';
import PagePagination from '@/main/components/layout/PagePagination';
import { pageLimitOptions } from '@/main/utils/pageLimitOptions';
import Posts from '@/main/components/mainPages/Posts';
import { ResourcesListSkeleton } from '@/main/components/skeletons/LoadingResourcesListPage';

async function FetchPostsList({ page, limit, params }) {
    const queryResults = await getListPaginated('posts', page, limit, params);
    const { items } = queryResults;
    return <Posts posts={items} />;
}

export default async function Page({ searchParams }) {
    const { page, limit, ...params } = searchParams;
    const currentPage = (page && Number(page)) || 1;
    const pageLimit = (limit && Number(limit)) || pageLimitOptions[0];

    const queryResults = await getListPaginated(
        'posts',
        currentPage,
        pageLimit,
        params
    );
    // const { items, ...pageInfo } = queryResults;
    // console.log('Posts page results: ', pageInfo);

    return (
        <PageWrapper header="Posts">
            <Suspense
                key={currentPage + pageLimit + params}
                fallback={<ResourcesListSkeleton />}>
                <FetchPostsList
                    page={currentPage}
                    limit={pageLimit}
                    params={params}
                />
            </Suspense>
            <PagePagination pagination={queryResults} />
        </PageWrapper>
    );
}
