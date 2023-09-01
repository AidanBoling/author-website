import { useState, useEffect } from 'react';
import PageTitle from '../PageTitle';

function PostPage() {
    const baseRoute = 'http://localhost:8000';
    const [post, setPost] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            const getPost = await fetch(`${baseRoute}/posts/post/${post}`)
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    setPost(result);
                    return post;
                });
        }
        fetchPosts();
    }, []);

    return (
        <div className="main">
            <PageTitle title={post} />
        </div>
    );
}

export default PostPage;
