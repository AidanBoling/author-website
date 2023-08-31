import { useState, useEffect } from 'react';
import Post from '../Post';

function Blog() {
    const baseRoute = 'http://localhost:8000';
    const [publishedPosts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const allPosts = await fetch(baseRoute + '/posts')
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    console.log(result);
                    setPosts(result);
                    return publishedPosts;
                });
        }
        fetchPosts();
    }, []);

    return (
        <div className="main">
            {console.log('Posts: ', publishedPosts)}

            <h1>Blog</h1>
            <hr />
            <div className="content">
                {publishedPosts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
            <hr />
        </div>
    );
}

export default Blog;

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"
