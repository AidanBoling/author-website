import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../api/getPost';
import PageTitle from '../PageTitle';

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState('');

    useEffect(() => {
        async function fetchPost() {
            const foundPost = await getPostById(postId);
            console.log(foundPost);
            setPost(foundPost);
        }
        fetchPost();
    }, []);

    return (
        <div className="main">
            {post && (
                <div>
                    <div className="post-header fullpage">
                        <h1>{post.title}</h1>
                        {/* TODO: Update this date to published date, once that's fixed */}
                        <p>{post.createdAt}</p>
                    </div>
                    <div className="post-content">
                        {post.content.map((paragraph, index) => (
                            <p key={index + 1}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostPage;
