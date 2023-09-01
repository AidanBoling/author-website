import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PostCard(props) {
    // console.log('Received post: ', props.post);
    // console.log(props.post._id);

    return (
        <div className="post card">
            <div className="post-header">
                <h2>{props.post.title}</h2>
                {/* TODO: Update this date to published date, once that's fixed */}
                <span>{props.post.createdAt}</span>
            </div>
            <div className="post-content">
                <p>{props.post.content[0].substring(0, 300) + '...'}</p>
            </div>
            <Link to={`/published/posts/id/${props.post._id}`} className="link">
                ➣ <span>Read post</span>
            </Link>
        </div>
    );
}

export default PostCard;
