import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PostCard(props) {
    console.log('Received post: ', props.post);
    // console.log(props.post._id);
    let summary = '';
    if (props.post.teaser) {
        summary = props.post.teaser;
    } else if (
        props.post.content.plain &&
        props.post.content.plain.length > 0
    ) {
        summary = props.post.content.plain[0].substring(0, 300) + '...';
    }

    return (
        <div className="post card">
            <div className="post-header">
                <h2>{props.post.title}</h2>
                {/* TODO: Update this date to published date, once that's fixed */}
                <span>{props.post.createdAt}</span>
            </div>
            <div className="post-content">
                <p>{summary}</p>
            </div>
            <Link to={`/published/posts/id/${props.post._id}`} className="link">
                ➣ <span>Read post</span>
            </Link>
        </div>
    );
}

export default PostCard;
