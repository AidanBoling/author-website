import { useState, useEffect } from 'react';
import { getBooks } from '../../api/getBooks';
import PageTitle from '../PageTitle';
import BookCard from '../BookCard';

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            const allBooks = await getBooks();
            console.log(allBooks);
            setBooks(allBooks);
            // return publishedPosts;
        }
        fetchBooks();
    }, []);

    return (
        <div className="main">
            <PageTitle title="Books" />
            {console.log('Books: ', books)}
            <div className="content">
                {books.length > 0 &&
                    books.map(book => <BookCard key={book._id} book={book} />)}
            </div>
        </div>
    );
}

export default Books;

// Create "Book" component/cards
// - cover pic
// - summary-short
// - link to book page
// - link to sales page (and/or)

// Create Books in server/db
// - Title
// - Publish date
// - Cover pic (link) (lorem picsum, random)
// - Summary (short)
// - Summary
// - store/purchase link (??)

// Create admin "Add/Submit Book" form/page (and same for articles...)
