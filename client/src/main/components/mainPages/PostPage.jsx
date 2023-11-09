'use client';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import DOMPurify from 'dompurify';
import { Box } from '@mui/material';
// import { getById } from '@/main/api/getResourceItems';
import NewsletterForm from '@/main/components/forms/NewsletterForm';
import AboutAuthorMini from '@/main/components/AboutAuthorMini';
// import ResourcePageSkeleton from '@/main/components/skeletons/ResourceFullPageSkeleton.jsx';
import PeriodicalsHeading from '@/main/components/layout/PeriodicalsHeading';
import PeriodicalsBody from '@/main/components/layout/PeriodicalsBody';

function PostPage({ post }) {
    // const params = useParams();
    // const [post, setPost] = useState('');
    // const [richText, setRichText] = useState('');

    let publishedDate = post.publishedDate
        ? post.publishedDate
        : post.createdAt;

    // useEffect(() => {
    //     async function fetchItem() {
    //         const foundItem = await getById(params.id, 'posts');
    //         // console.log(foundItem);
    //         setPost(foundItem);
    //         setRichText(foundItem.content.richText);
    //     }
    //     fetchItem();
    // }, []);

    return (
        <>
            {post && (
                <>
                    <PeriodicalsHeading
                        title={post.title}
                        published={publishedDate}
                    />
                    <PeriodicalsBody
                        periodical={post}
                        imageFloat="left"
                        content={post.content.richText}
                        contentFallback={
                            post.content.plain &&
                            post.content.plain.length > 0 &&
                            post.content.plain.map((paragraph, index) => (
                                <p key={index + 1}>{paragraph}</p>
                            ))
                        }
                    />
                    {/* <Box mt={'2rem'}>
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
                                contentFallback
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
                    /> */}
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
