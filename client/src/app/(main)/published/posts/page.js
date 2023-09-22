import { Suspense } from 'react';
import { getList } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/PageWrapper';
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

export default async function Page() {
    const posts = await getList('posts');

    return (
        <PageWrapper header="Posts">
            <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
                <Posts posts={posts} />
            </Suspense>
        </PageWrapper>
    );
}
