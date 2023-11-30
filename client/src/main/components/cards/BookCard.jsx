'use client';
import Link from 'next/link';
import { Box, Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function BookCard({ book }) {
    const purchaseButtons =
        book.purchaseInfo &&
        book.purchaseInfo.length > 0 &&
        book.purchaseInfo.map(store => (
            <Button
                key={store._id}
                variant="contained"
                href={store.link}
                target="_blank"
                aria-label={`Go to the ${store.location} page for this book, which opens in a new tab`}
                sx={{ flexGrow: { xs: 1, md: 'unset' } }}>
                Order on {store.location}
            </Button>
        ));
    // width: '325px',
    const break1 = 'xs';
    const break2 = 'msm';

    const mediaSXOverride = {
        width: { [break1]: 250, [break2]: 200 },
        aspectRatio: '0.67',
        // height: 275,
        borderRadius: '.25rem',
        mx: { [break1]: 'auto', [break2]: '.75rem' },
        mt: { [break1]: '1.25rem', [break2]: '.75rem' },
        mb: { [break1]: 0, [break2]: '.75rem' },
        flexShrink: 0,
    };

    return (
        <ResourceCard
            title={book.title}
            hasMedia
            image={
                book.coverImage
                    ? book.coverImage.url
                    : book.coverImagePlaceholder
            }
            imageAlt="book cover"
            mediaSXOverride={mediaSXOverride}
            published={book.datePublished}
            created={book.createdAt}
            dateFormatOverride={{ year: 'numeric' }}
            content={book.description.short}
            actions={
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { [break1]: 'column', sm: 'row' },
                        gap: '1rem',
                        justifyContent: 'space-between',
                        mr: { [break1]: 0, sm: '1.75rem' },
                    }}>
                    <Button
                        component={Link}
                        href={`/published/books/id/${book._id}`}
                        className="link"
                        variant="outlined">
                        ➣ Read more
                    </Button>
                    {purchaseButtons}
                </Box>
            }
            actionsAlwaysShow={
                <Box
                    sx={{
                        width: '100%',
                        // display: { [break1]: 'flex', sm: 'inline' },
                        display: 'flex',
                        flexDirection: { [break1]: 'column', sm: 'row' },
                        gap: '1rem',
                        justifyContent: 'space-between',
                        mr: { [break1]: 0, sm: '1.75rem' },
                    }}>
                    <Button
                        component={Link}
                        href={`/published/books/id/${book._id}`}
                        className="link"
                        variant="outlined">
                        ➣ Read more
                    </Button>
                    {purchaseButtons}
                </Box>
            }
        />
    );
}

export default BookCard;
