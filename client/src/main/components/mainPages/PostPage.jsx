'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Box, Typography, Divider } from '@mui/material';
import { getById } from '@/main/api/getResourceItems';
import NewsletterForm from '../NewsletterForm';
import AboutAuthorMini from '../AboutAuthorMini';
import ResourcePageSkeleton from '@/main/components/skeletons/ResourceFullPageSkeleton.jsx';
import ResponsiveImageContainer from '../ResponsiveImageContainer';

function PostPage(props) {
    const params = useParams();
    const [post, setPost] = useState('');
    const [richText, setRichText] = useState('');

    let publishedDate = post.publishedDate
        ? post.publishedDate
        : post.createdAt;

    useEffect(() => {
        async function fetchItem() {
            const foundItem = await getById(params.id, 'posts');
            // console.log(foundItem);
            setPost(foundItem);
            setRichText(foundItem.content.richText);
        }
        fetchItem();
    }, []);

    return (
        <>
            {post && (
                <>
                    <Box className="post-header fullpage" mb={2}>
                        <Typography variant="h3" component="h2">
                            {post.title}
                        </Typography>
                        <Typography
                            variant="subheading1"
                            component="p"
                            color={'grey.main'}
                            mb={2}>
                            <i>Published on </i>
                            {new Date(publishedDate).toLocaleDateString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </Typography>
                        {/* <Typography variant="subheading1" component="p" color='text.secondary'>Updated on {post.updatedAt}</Typography> */}
                        <Divider mt={2} />
                    </Box>
                    <Box mt={'2rem'}>
                        {post.image && (
                            <ResponsiveImageContainer float="left">
                                <Image
                                    src={post.image.url}
                                    alt={post.image.altText}
                                    width={500}
                                    height={400}
                                    priority
                                    style={{
                                        width: 'auto',
                                        objectFit: 'cover',
                                        // mx: { xs: 'auto', md: 0 },
                                    }}
                                />
                            </ResponsiveImageContainer>
                        )}

                        <Box className="post-content">
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
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            width: '95%',
                            maxWidth: '800px',
                            mt: '5rem',
                            mx: 'auto',
                        }}
                    />

                    <Box>
                        <AboutAuthorMini />
                        <NewsletterForm />
                    </Box>
                </>
            )}
        </>
    );
}

export default PostPage;
