import { Suspense } from 'react';
import PageWrapper from '@/main/components/PageWrapper';
import Articles from '@/main/components/mainPages/Articles';
import { getList } from '@/main/api/getResourceItems';
import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';
import ArticlesList from '@/main/components/ArticlesList';

// async function GetArticles() {
//
//     return (
//         <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
//             <Articles articles={articles} />
//         </Suspense>
//     );
// }

export default async function Page() {
    const queryResults = await getList('articles');

    return (
        <PageWrapper header="Articles">
            <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
                <Articles articles={queryResults.items} />
            </Suspense>
        </PageWrapper>
    );
}
