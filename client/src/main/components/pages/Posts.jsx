import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getList } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';
import PostCard from '../PostCard';
import ResourceCardSkeleton from '../ResourceCardSkeleton';

function Posts() {
    const [publishedPosts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const allItems = await getList('posts');
            // console.log(allItems);
            setPosts(allItems);
        }
        fetchItems();
    }, []);

    return (
        <div className="main">
            <PageTitle title="Blog" />
            <div className="content">
                <Stack spacing={3}>
                    {publishedPosts.length > 0 ? (
                        publishedPosts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))
                    ) : (
                        <ResourceCardSkeleton hasMedia="false" />
                    )}
                </Stack>
            </div>
            {/* <hr /> */}
        </div>
    );
}

export default Posts;

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"
