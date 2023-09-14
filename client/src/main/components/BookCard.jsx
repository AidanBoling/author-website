import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function BookCard(props) {
    console.log('Received book: ', props.book);
    // console.log(props.post._id);

    return (
        <ResourceCard
            title={props.book.title}
            hasMedia
            image={props.book.coverImage}
            imageAlt="book cover"
            mediaSXOverride={{
                width: 200,
                height: 275,
                borderRadius: '.25rem',
                m: '.75rem',
                flexShrink: 0,
            }}
            published={props.book.datePublished}
            created={props.book.createdAt}
            dateFormatOverride={{ year: 'numeric' }}
            content={props.book.description.short}
            actions={
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mr: '1.75rem',
                    }}>
                    <Button
                        component={RouterLink}
                        to={`/published/books/id/${props.book._id}`}
                        className="link">
                        ➣ Read more
                    </Button>
                    {props.book.purchaseInfo.length > 0 &&
                        props.book.purchaseInfo.map(store => (
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
            }
        />
    );
}

export default BookCard;
