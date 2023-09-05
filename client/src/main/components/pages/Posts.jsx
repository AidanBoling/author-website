import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../api/getPosts';
import PageTitle from '../PageTitle';
import PostCard from '../PostCard';

function Posts() {
    const [publishedPosts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const allPosts = await getPosts();
            console.log(allPosts);
            setPosts(allPosts);
            // return publishedPosts;
        }
        fetchPosts();
    }, []);

    return (
        <div className="main">
            {console.log('Posts: ', publishedPosts)}
            <PageTitle title="Blog" />
            <div className="content">
                {publishedPosts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
            <hr />
        </div>
    );
}

export default Posts;

// TODO: Make posts shortened (200-300chars...)
// TODO: Limit number of posts shown (pulled?) at once (10, 15, 25...) --> use either a "next page", or a "more"

// Link to post full page from each individual
