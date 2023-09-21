'use client';
// import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Button, useMediaQuery } from '@mui/material';
import ResourceCard from './ResourceCard';

function BookCard(props) {
    console.log('Received book: ', props.book);
    // console.log(props.post._id);

    const purchaseButtons =
        props.book.purchaseInfo.length > 0 &&
        props.book.purchaseInfo.map(store => (
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

    const mediaSXOverride = {
        width: 200,
        height: 275,
        borderRadius: '.25rem',
        m: '.75rem',
        flexShrink: 0,
    };

    return (
        <ResourceCard
            title={props.book.title}
            hasMedia
            image={props.book.coverImage}
            imageAlt="book cover"
            mediaSXOverride={mediaSXOverride}
            published={props.book.datePublished}
            created={props.book.createdAt}
            dateFormatOverride={{ year: 'numeric' }}
            content={props.book.description.short}
            actions={
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: '1rem',
                        justifyContent: 'space-between',
                        mr: '1.75rem',
                    }}>
                    <Button
                        component={Link}
                        href={`/published/books/id/${props.book._id}`}
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
                        display: 'flex',
                        mr: '1.75rem',
                    }}>
                    {purchaseButtons}
                </Box>
            }
        />
    );
}

export default BookCard;
