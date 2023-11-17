'use client';
import { ErrorBoundary } from 'react-error-boundary';
import ResourceCardError from '../errors/ResourceCardError';
import { Stack } from '@mui/material';
import BookCard from '@/main/components/cards/BookCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';

function Books(props) {
    return (
        <Stack spacing={3}>
            {props.books.length > 0 ? (
                props.books.map(book => (
                    <ErrorBoundary fallback={<ResourceCardError item={book} />}>
                        <BookCard key={book._id} book={book} />
                    </ErrorBoundary>
                ))
            ) : (
                <NoItemsMessage message={'No books found'} />
            )}
        </Stack>
    );
}

export default Books;
