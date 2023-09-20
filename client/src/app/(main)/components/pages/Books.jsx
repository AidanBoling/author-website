import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getList } from '../../../../main/api/getResourceItems';
import BookCard from '../cards/BookCard';
import ResourceCardSkeleton from '../cards/ResourceCardSkeleton';

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const allItems = await getList('books');
            console.log(allItems);
            setBooks(allItems);
            // return publishedPosts;
        }
        fetchItems();
    }, []);

    return (
        <div>
            {/* {console.log('Books: ', books)} */}
            <Stack spacing={3}>
                {books.length > 0 ? (
                    books.map(book => <BookCard key={book._id} book={book} />)
                ) : (
                    <ResourceCardSkeleton hasMedia={true} />
                )}
            </Stack>
        </div>
    );
}

export default Books;
