'use client';
import DOMPurify from 'dompurify';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

function BookPage({ book }) {
    const breakpoint = 'md';
    const coverWidth = { xs: '75vw', sm: 400, [breakpoint]: 300 };
    const baselineGap = '2.5rem';
    // const dims = book.coverImage && book.coverImage.dimensions;

    const Header = () => (
        <>
            <Typography variant="h3" component="h2">
                {book.title}
            </Typography>
            <Typography
                variant="h6"
                componenent="p"
                color="grey.main"
                mb={baselineGap}>
                {`${new Date(book.datePublished).toLocaleDateString('en-us', {
                    month: 'long',
                    year: 'numeric',
                })}`}
            </Typography>
        </>
    );

    return (
        book && (
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
                            src={
                                (book.coverImage && book.coverImage.url) ||
                                book.coverImagePlaceholder
                            }
                            alt="book cover"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                    <Header />
                    <Box>
                        {book.description &&
                            (book.description.long ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            book.description.long
                                        ),
                                    }}
                                />
                            ) : (
                                book.description.short
                            ))}
                    </Box>
                    {book.purchaseInfo && book.purchaseInfo.length > 0 && (
                        <Box className="book-purchase" my={baselineGap} flex>
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
            </Box>
        )
    );
}

export default BookPage;

//
//
// TEMP Archive -------------------------
//

// const breakpoint = 'md';
//     const coverWidth = { xs: '75vw', sm: 400, [breakpoint]: 300 };
//     const baselineGap = '2.5rem';
//     const dims = book.coverImage && book.coverImage.dimensions;
//     const containerSx = !book.coverImage
//         ? { width: coverWidth, aspectRatio: 0.67 }
//         : {};

//     const CoverImage = () =>
//         book.coverImage ? (
//             <Image
//                 className="book-cover"
//                 src={book.coverImage.url}
//                 alt="book cover"
//                 width={400}
//                 height={300 / 0.67}
//                 style={{
//                     height: 'auto',
//                     objectFit: 'contain',
//                 }}
//             />
//         ) : (
//             <Image
//                 className="book-cover"
//                 src={book.coverImagePlaceholder}
//                 alt="book cover"
//                 fill
//                 style={{
//                     width: '100%',
//                     objectFit: 'cover',
//                 }}
//             />
//         );
