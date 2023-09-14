import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { getById } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';

function BookPage() {
    const { bookId } = useParams();
    // console.log(bookId);
    const [book, setBook] = useState('');

    useEffect(() => {
        async function fetchItem() {
            const foundItem = await getById(bookId, 'books');
            // console.log(foundItem);
            setBook(foundItem);
        }
        fetchItem();
    }, []);

    return (
        <div className="main">
            {book && (
                <div className="content">
                    <div className="book fullpage">
                        <Box sx={{ display: 'inline' }}>
                            <Box
                                component="img"
                                className="book-cover"
                                src={book.coverImageUrl}
                                alt="book cover"
                                sx={{
                                    width: 300,
                                    height: 400,
                                    borderRadius: '.25rem',
                                    mr: '1.5rem',
                                    mb: '1.5rem',
                                    flexShrink: 0,
                                    float: 'left',
                                    shapeOutside: 'margin-box',
                                }}></Box>
                            <div className="book-header fullpage">
                                <Typography
                                    variant="h3"
                                    component="h2"
                                    mb="2rem">
                                    {book.title}
                                </Typography>
                            </div>
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
                                <Box className="book-purchase" my="2rem" flex>
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
                            <Box className="book-details">
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookPage;
