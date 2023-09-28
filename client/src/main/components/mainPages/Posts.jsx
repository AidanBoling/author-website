'use client';
import { Stack } from '@mui/material';
import PostCard from '@/main/components/cards/PostCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';

function Posts(props) {
    return (
        <Stack spacing={3}>
            {props.posts.length > 0 ? (
                props.posts.map(post => <PostCard key={post._id} post={post} />)
            ) : (
                <NoItemsMessage message={'No posts found.'} />
            )}
        </Stack>
    );
}

export default Posts;

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"