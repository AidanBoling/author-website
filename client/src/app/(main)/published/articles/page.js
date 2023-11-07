import { Suspense } from 'react';
import PageWrapper from '@/main/components/PageWrapper';
import Articles from '@/main/components/mainPages/Articles';
import { getList } from '@/main/api/getResourceItems';
import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';

// async function GetArticles() {
//
//     return (
//         <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
//             <Articles articles={articles} />
//         </Suspense>
//     );
// }

export default async function Page({ searchParams }) {
    // console.log(searchParams);
    const queryResults = await getList('articles', searchParams);
    const { items, ...pageInfo } = queryResults;
    console.log('Articles page results: ', pageInfo);

    return (
        <PageWrapper header="Articles" pagination={pageInfo}>
            <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
                <Articles articles={items} />
            </Suspense>
        </PageWrapper>
    );
}
