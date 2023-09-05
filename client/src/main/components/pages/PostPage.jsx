import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getPostById } from '../../api/getPost';
import PageTitle from '../PageTitle';

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [richText, setRichText] = useState('');

    useEffect(() => {
        async function fetchPost() {
            const foundPost = await getPostById(postId);
            console.log(foundPost);
            setPost(foundPost);
            setRichText(foundPost.content.richText);
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
                        <p>Published: {post.createdAt}</p>
                        {/* <p>{post.publishedDate}</p> */}
                        {/* <p>Updated: {post.updatedAt}</p> */}
                    </div>
                    <div className="post-content">
                        {post.content.richText ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(richText),
                                }}
                            />
                        ) : (
                            post.content.plain &&
                            post.content.plain.length > 0 &&
                            post.content.plain.map((paragraph, index) => (
                                <p key={index + 1}>{paragraph}</p>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostPage;
