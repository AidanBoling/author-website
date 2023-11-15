import { Suspense } from 'react';
// import PageWrapper from '@/main/components/PageWrapperTest';
import Articles from '@/main/components/mainPages/Articles';
import { getList } from '@/main/api/getResourceItems';
import ResourceCardSkeleton from '@/main/components/skeletons/ResourceCardSkeleton';

export default async function GetArticles() {
    const articles = await getList('articles');
    return (
        <Suspense fallback={<ResourceCardSkeleton hasMedia="true" />}>
            <Articles articles={articles} />
        </Suspense>
    );
}

// export async function GetEvents() {
//     const events = await getList('events');

//     return (
//         <Suspense fallback={<ResourceCardSkeleton hasMedia />}>

//         </Suspense>
//     );
// }
