import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import '../css/styles.css';
import reactLogo from '../../assets/react.svg';
import Navbar from './Navbar';
import PageWrapper from './PageWrapper';
import Home from '../../app/(main)/components/pages/Home';
import Published from './pages/Published';
import Books from '../../app/(main)/components/pages/Books';
import BookPage from '../../app/(main)/components/pages/BookPage';
import Articles from '../../app/(main)/components/pages/Articles';
import ArticlePage from '../../app/(main)/components/pages/ArticlePage';
import Posts from '../../app/(main)/components/pages/Posts';
import PostPage from '../../app/(main)/components/pages/PostPage';
import Events from '../../app/(main)/components/pages/Events';
import About from './pages/About';
import Contact from '../../app/(main)/components/pages/Contact';
import Footer from '../../app/(main)/components/Footer';

function App() {
    const footerHeight = '200px';

    return (
        <div>
            <Box
                className="bgmountains"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: `calc(100vh - ${footerHeight})`,
                    pb: '15vh',
                }}>
                <Box
                    className="bg pattern"
                    sx={{
                        width: '100vw',
                        height: '100%',
                        position: 'fixed',
                        backgroundAttachment: 'fixed',
                        opacity: '.2',
                        zIndex: '-1',
                    }}></Box>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    {/* <Route path="/published" element={<Published />} /> */}
                    <Route
                        path="/published/posts"
                        element={
                            <PageWrapper header="Posts" content={<Posts />} />
                        }
                    />
                    <Route
                        path="/published/posts/id/:postId"
                        element={
                            <PageWrapper content={<PostPage />} usePaper />
                        }
                    />
                    <Route
                        path="published/books"
                        element={
                            <PageWrapper header="Books" content={<Books />} />
                        }
                    />
                    <Route
                        path="/published/books/id/:bookId"
                        element={
                            <PageWrapper content={<BookPage />} usePaper />
                        }
                    />
                    <Route
                        path="/published/articles"
                        element={
                            <PageWrapper
                                header="Articles"
                                content={<Articles />}
                            />
                        }
                    />
                    <Route
                        path="/published/articles/id/:articleId"
                        element={
                            <PageWrapper content={<ArticlePage />} usePaper />
                        }
                    />
                    {/* <Route path="/admin/compose" element={<Compose />} /> */}
                    <Route
                        path="/events"
                        element={
                            <PageWrapper header="Events" content={<Events />} />
                        }
                    />
                    {/* <Route
                        path="/about"
                        element={
                            <PageWrapper
                                header="About"
                                content={<About />}
                                usePaper
                            />
                        }
                    /> */}
                    <Route
                        path="/contact"
                        element={
                            <PageWrapper
                                header="Contact"
                                content={<Contact />}
                            />
                        }
                    />
                </Routes>
            </Box>
            <Footer height={footerHeight} />
        </div>
    );
}

export default App;
