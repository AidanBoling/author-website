import { Suspense } from 'react';
import { getList } from '@/main/api/getResourceItems';
import PostCard from '../cards/PostCard';
import NoItemsMessage from '../NoItemsMessage';
import ResourceCardSkeleton from '@/main/components/skeletons/ResourceCardSkeleton';

export default async function PostsList() {
    const posts = await getList('posts');

    return (
        <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
            {posts.length > 0 ? (
                posts.map(post => <PostCard key={post._id} post={post} />)
            ) : (
                <NoItemsMessage message={'No posts found.'} />
            )}
        </Suspense>
    );
}

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"
