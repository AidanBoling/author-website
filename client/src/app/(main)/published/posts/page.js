import { Suspense } from 'react';
import { getList } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/layout/PageWrapper';
import Posts from '@/main/components/mainPages/Posts';
import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';
// import PostsList from '@/main/components/PostsList';

// async function GetPosts() {
//     const posts = await getList('posts');
//     return (
//         <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
//             <Posts posts={posts} />
//         </Suspense>
//     );
// }

export default async function Page({ searchParams }) {
    const queryResults = await getList('posts', searchParams);
    const { items, ...pageInfo } = queryResults;
    console.log('Posts page results: ', pageInfo);

    return (
        <PageWrapper header="Posts" pagination={pageInfo}>
            <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
                <Posts posts={items} />
            </Suspense>
        </PageWrapper>
    );
}
