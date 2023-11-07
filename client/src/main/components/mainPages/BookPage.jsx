'use client';
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import { Box, Button, Typography } from '@mui/material';
// import { getById } from '@/main/api/getResourceItems';
// import { notFound } from 'next/navigation';
import Image from 'next/image';

function BookPage({ book }) {
    // if (!book) {
    //     notFound();
    // }

    // const params = useParams();
    // console.log(bookId);
    // const [book, setBook] = useState('');

    const breakpoint = 'md';
    const coverWidth = { xs: '75vw', sm: 400, [breakpoint]: 300 };
    const baselineGap = '2.5rem';

    const Header = () => (
        <div className="book-header fullpage">
            <Typography variant="h3" component="h2" mb={baselineGap}>
                {book.title}
            </Typography>
        </div>
    );

    // useEffect(() => {
    //     async function fetchItem() {
    //         const foundItem = await getById(params.id, 'books');
    //         // console.log(foundItem);
    //         setBook(foundItem);
    //     }
    //     fetchItem();
    // }, []);

    return (
        <>
            {book && (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mt: baselineGap }}>
                        <Box
                            sx={{
                                width: coverWidth,
                                aspectRatio: 0.67,
                                borderRadius: '.25rem',
                                ml: { xs: 'auto', [breakpoint]: 0 },
                                mr: { xs: 'auto', [breakpoint]: baselineGap },
                                mb: baselineGap,
                                flexShrink: 0,
                                float: { xs: 'unset', [breakpoint]: 'left' },

                                contain: 'content',
                                shapeOutside: 'margin-box',
                            }}>
                            <Image
                                className="book-cover"
                                src={book.coverImage}
                                alt="book cover"
                                fill
                                style={{
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Header />
                        <Box className="book-content">
                            {book.description.long ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            book.description.long
                                        ),
                                    }}
                                />
                            ) : (
                                book.description.short
                            )}
                        </Box>
                        {book.purchaseInfo.length > 0 && (
                            <Box
                                className="book-purchase"
                                my={baselineGap}
                                flex>
                                {book.purchaseInfo.map(store => (
                                    <Button
                                        key={store._id}
                                        variant="contained"
                                        href={store.link}
                                        target="_blank"
                                        aria-label={`Go to the ${store.location} page for this book, which opens in a new tab`}>
                                        Order on {store.location}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Box className="book-details" sx={{ width: '100%' }}>
                        <Typography paragraph>
                            {`Published: ${new Date(
                                book.datePublished
                            ).toLocaleDateString('en-us', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}`}
                        </Typography>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default BookPage;
