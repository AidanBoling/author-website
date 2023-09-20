import { useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import PageTitle from '../../../app/(main)/components/PageTitle';

function Published() {
    return (
        <div>
            <div className="main">
                <PageTitle title="Published Works" />

                <div className="content">
                    <ul>
                        <li>
                            <MuiLink to="/published/books">Books</MuiLink>
                        </li>
                        <li>
                            <MuiLink to="/published/articles">Articles</MuiLink>
                        </li>
                        <li>
                            <MuiLink to="/published/posts">Blog</MuiLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Published;
