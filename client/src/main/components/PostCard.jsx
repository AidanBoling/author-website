import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { palette } from '@mui/system';
import { Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function PostCard(props) {
    // console.log('Received post: ', props.post);
    // console.log(props.post._id);
    let summary = '';
    if (props.post.content.teaser) {
        summary = props.post.content.teaser;
    } else if (
        props.post.content.plain &&
        props.post.content.plain.length > 0
    ) {
        summary = props.post.content.plain[0].substring(0, 300) + '...';
    }

    return (
        <ResourceCard
            title={props.post.title}
            hasMedia={false}
            // image={props.article.image.url}
            // imageAlt={props.article.image.altText}
            published={props.post.publishedDate}
            created={props.post.createdAt}
            content={summary}
            actions={
                <Link
                    to={`/published/posts/id/${props.post._id}`}
                    className="link">
                    <Button>➣ Read post</Button>
                </Link>
            }
        />
    );
}

export default PostCard;
