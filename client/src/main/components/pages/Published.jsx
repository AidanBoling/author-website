import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PageTitle from '../PageTitle';

function Published() {
    return (
        <div>
            <div className="main">
                <PageTitle title="Published Works" />

                <div className="content">
                    <ul>
                        <li>
                            <Link to="/published/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/published/articles">Articles</Link>
                        </li>
                        <li>
                            <Link to="/published/posts">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Published;
