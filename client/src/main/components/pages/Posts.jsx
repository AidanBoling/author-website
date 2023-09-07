import { useState, useEffect } from 'react';
import { getList } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';
import PostCard from '../PostCard';

function Posts() {
    const [publishedPosts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const allItems = await getList('posts');
            console.log(allItems);
            setPosts(allItems);
            // return publishedPosts;
        }
        fetchItems();
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
