'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function PostCard({ post }) {
    // const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    // console.log('Received post: ', post);

    let summary = '';
    if (post.content && post.content.teaser) {
        summary = post.content.teaser.substring(0, 300) + '...';
    } else if (
        post.content &&
        post.content.plain &&
        post.content.plain.length > 0
    ) {
        summary = post.content.plain[0].substring(0, 300) + '...';
    }

    const image =
        post.image && (post.image.fromDB ? post.image.fromDB : post.image);

    return (
        <ResourceCard
            resource="post"
            title={post.title}
            image={image && image.url ? image.url : null}
            imageAlt={image && image.altText ? image.altText : null}
            published={post.datePublished}
            created={post.createdAt}
            content={summary}
            mainLinkIsLocal={true}
            mainLinkTo={`/published/posts/id/${post._id}`}
            mainLinkLabel="Read full post"
            actions={
                <Button
                    component={Link}
                    href={`/published/posts/id/${post._id}`}
                    className="link">
                    ➣ Read full post
                </Button>
            }
        />
    );
}

export default PostCard;
