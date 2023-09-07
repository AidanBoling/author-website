import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getById } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';

function BookPage() {
    const { bookId } = useParams();
    console.log(bookId);
    const [book, setBook] = useState('');

    useEffect(() => {
        async function fetchItem() {
            const foundItem = await getById(bookId, 'books');
            console.log(foundItem);
            setBook(foundItem);
        }
        fetchItem();
    }, []);

    return (
        <div className="main">
            {book && (
                <div className="book fullpage">
                    {console.log(book)}

                    <div className="book-header fullpage">
                        <h1>{book.title}</h1>
                    </div>
                    <div className="book-cover">
                        <img src={book.coverImageUrl} alt="book cover"></img>
                    </div>

                    <div className="book-details">
                        <p>
                            Published:{' '}
                            {new Date(book.datePublished).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="book-content">
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
                    </div>
                    {book.purchaseInfo.length > 0 && (
                        <div className="book-purchase">
                            {/* TODO: - Make sure link opens new tab; - add accessibility for button */}
                            <p>Where to buy:</p>
                            {book.purchaseInfo.map(store => (
                                <a href={`${store.link}`} key={store._id}>
                                    <button>{store.location}</button>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BookPage;
