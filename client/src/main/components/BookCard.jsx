import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function BookCard(props) {
    console.log('Received book: ', props.book);
    // console.log(props.post._id);
    let shortSummary = props.book.description.short;

    return (
        <ResourceCard
            title={props.book.title}
            hasMedia
            image={props.book.coverImageUrl}
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
            content={shortSummary}
            actions={
                <Link
                    to={`/published/books/id/${props.book._id}`}
                    className="link">
                    <Button>➣ Read more</Button>
                </Link>
            }
        />
    );
}

export default BookCard;

// <div className="book card resource-card">

// <div className="book-image card image">
//                 <img src={props.book.coverImageUrl} />
//             </div>
//             <div className="card content">
//                 <div className="book-header">
//                     <h2>{props.book.title}</h2>
//                     {/* <span>{Date(props.post.datePublished).getFullYear()}</span> */}
//                 </div>
//                 <div className="book-content">
//                     <p>{shortSummary}</p>
//                 </div>
//                 <Link
//                     to={`/published/books/id/${props.book._id}`}
//                     className="link">
//                     ➣ <span>Read more</span>
//                 </Link>
//             </div>
//         </div>
