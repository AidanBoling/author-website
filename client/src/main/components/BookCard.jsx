import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BookCard(props) {
    console.log('Received book: ', props.book);
    // console.log(props.post._id);
    let shortSummary = props.book.description.short;

    return (
        <div className="book card">
            <div className="book-header">
                <h2>{props.book.title}</h2>
                {/* <span>{props.post.createdAt}</span> */}
            </div>
            <div className="book-content">
                <p>{shortSummary}</p>
            </div>
            <Link to={`/published/books/id/${props.book._id}`} className="link">
                ➣ <span>Read more</span>
            </Link>
        </div>
    );
}

export default BookCard;
