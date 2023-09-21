'use client';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getList } from '@/main/api/getResourceItems';
import PostCard from '../cards/PostCard';
import ResourceCardSkeleton from '../cards/ResourceCardSkeleton';

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
        <Stack spacing={3}>
            {publishedPosts.length > 0 ? (
                publishedPosts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            ) : (
                <ResourceCardSkeleton hasMedia="true" />
            )}
        </Stack>
    );
}

export default Posts;

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"
