'use client';
import { ErrorBoundary } from 'react-error-boundary';
import ResourceCardError from '../errors/ResourceCardError';
import { Stack } from '@mui/material';
import PostCard from '@/main/components/cards/PostCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';

function Posts(props) {
    return (
        <Stack spacing={{ xs: 4, md: 3 }}>
            {props.posts.length > 0 ? (
                props.posts.map(post => (
                    <ErrorBoundary
                        key={post._id}
                        fallback={<ResourceCardError item={post} />}>
                        <PostCard post={post} />
                    </ErrorBoundary>
                ))
            ) : (
                <NoItemsMessage message={'No posts found.'} />
            )}
        </Stack>
    );
}

export default Posts;

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"
