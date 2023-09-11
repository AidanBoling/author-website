import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getList } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';
import BookCard from '../BookCard';
import ResourceCardSkeleton from '../ResourceCardSkeleton';

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
        <div className="main">
            <PageTitle title="Books" />
            {console.log('Books: ', books)}
            <div className="content">
                <Stack spacing={3}>
                    {books.length > 0 ? (
                        books.map(book => (
                            <BookCard key={book._id} book={book} />
                        ))
                    ) : (
                        <ResourceCardSkeleton hasMedia={true} />
                    )}
                </Stack>
            </div>
        </div>
    );
}

export default Books;

// [x] Create "Book" component/cards
// - cover pic
// - summary-short
// - link to book page
// - link to sales page (and/or)

// [x] Create Books in server/db
// - Title
// - Publish date
// - Cover pic (link) (lorem picsum, random)
// - Summary (short)
// - Summary
// - store/purchase link (??)

// [x] Create admin "Add/Submit Book" form/page (and same for articles...)
