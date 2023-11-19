import { Suspense } from 'react';
import PageWrapper from '@/main/components/layout/PageWrapper';
import PagePagination from '@/main/components/layout/PagePagination';
import { pageLimitOptions } from '@/main/utils/pageLimitOptions';
import { getListPaginated } from '@/main/api/getResourceItems';
import Articles from '@/main/components/mainPages/Articles';
import ResourcesListSkeleton from '@/main/components/skeletons/LoadingResourcesListPage';

export const revalidate = 300;

async function FetchArticlesList({ page, limit, params }) {
    const queryResults = await getListPaginated(
        'articles',
        page,
        limit,
        params
    );
    const { items } = queryResults;
    return <Articles articles={items} />;
}

export default async function Page({ searchParams }) {
    const { page, limit, ...params } = searchParams;
    const currentPage = (page && Number(page)) || 1;
    const pageLimit = (limit && Number(limit)) || pageLimitOptions[0];

    const queryResults = await getListPaginated(
        'articles',
        currentPage,
        pageLimit,
        params
    );
    // const { items, ...pageInfo } = queryResults;
    // console.log('Articles page results: ', pageInfo);

    return (
        <PageWrapper header="Articles">
            <Suspense
                key={currentPage + pageLimit + params}
                fallback={<ResourcesListSkeleton />}>
                <FetchArticlesList
                    page={currentPage}
                    limit={pageLimit}
                    params={params}
                />
            </Suspense>
            <PagePagination pagination={queryResults} />
        </PageWrapper>
    );
}
