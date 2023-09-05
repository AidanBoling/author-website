import { useState, useEffect } from 'react';
import PageTitle from '../PageTitle';

function Books() {
    return (
        <div className="main">
            <PageTitle title="Books" />
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
