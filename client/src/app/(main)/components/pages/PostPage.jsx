import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Box, Typography, Divider } from '@mui/material';
import { getById } from '../../../../main/api/getResourceItems';

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [richText, setRichText] = useState('');

    let publishedDate = post.publishedDate
        ? post.publishedDate
        : post.createdAt;

    useEffect(() => {
        async function fetchItem() {
            const foundItem = await getById(postId, 'posts');
            console.log(foundItem);
            setPost(foundItem);
            setRichText(foundItem.content.richText);
        }
        fetchItem();
    }, []);

    return (
        <div>
            {post && (
                <Box className="post-header fullpage" mb={2}>
                    <Typography variant="h2" component="h2">
                        {post.title}
                    </Typography>
                    {/* TODO: Update this date to published date, once that's fixed */}
                    <Typography variant="subheading1" component="p" mb={2}>
                        <i>Published: </i>
                        {new Date(publishedDate).toLocaleDateString('en-US', {
                            // weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Typography>
                    {/* <p>Updated: {post.updatedAt}</p> */}
                    <Divider mt={2} />
                </Box>
            )}
            {post && post.image && (
                <div className="image fullpage">
                    <img src={post.image.url} alt={post.image.altText} />
                </div>
            )}
            {post && (
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
            )}
        </div>
    );
}

export default PostPage;
