import React, { useState } from 'react';

function Post(props) {
    // console.log('Received post: ', props.post);
    // console.log(props.post._id);

    return (
        <div className="post">
            <div className="post-header">
                <h2>{props.post.title}</h2>
                {/* TODO: Update this date to published date, once that's fixed */}
                <span>{props.post.createdAt}</span>
            </div>
            <div className="post-content">
                {[props.shortened] ? (
                    <p>{props.post.content[0].substring(0, 300) + '...'}</p>
                ) : (
                    props.post.content.map((paragraph, index) => (
                        <p key={index + 1}>{paragraph}</p>
                    ))
                )}
            </div>
        </div>
    );
}

export default Post;
