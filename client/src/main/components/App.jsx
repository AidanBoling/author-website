import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import '../css/styles.css';
import reactLogo from '../../assets/react.svg';
import Navbar from './Navbar';
import PageWrapper from './PageWrapper';
import Home from './pages/Home';
import Published from './pages/Published';
import Books from './pages/Books';
import BookPage from './pages/BookPage';
import Articles from './pages/Articles';
import ArticlePage from './pages/ArticlePage';
import Posts from './pages/Posts';
import PostPage from './pages/PostPage';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './Footer';

function App() {
    return (
        <Box
            className="bgmountains"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
            {/* <div className="bgmask edge">
                <div className="background-edge">
                    <img
                        src="/leaves-wall_matteo-miliddi-unsplash.jpeg"
                        className="background-edge"
                    />
                </div>
            </div> */}
            <Box
                className="bg pattern"
                sx={{
                    width: '100vw',
                    height: '100%',
                    position: 'fixed',
                    backgroundAttachment: 'fixed',
                    opacity: '.2',
                    zIndex: '-1',
                }}>
                {/* <img src="/white-rhombus-background.jpg" className="bg" /> */}
            </Box>
            {/* <Box
                className="bgmountains-mask"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    zIndex: '-2',
                    position: 'absolute',
                }}> */}
            {/* <div className="bgmountains gradient"></div> */}
            {/* <Box
                    component="img"
                    src="/green-gold-abstract-mountains_transparent.png"
                    className="bgmountains"
                    sx={{ position: 'relative' }}
                /> */}
            {/* </Box> */}
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                {/* <Route path="/published" element={<Published />} /> */}
                <Route
                    path="/published/posts"
                    element={<PageWrapper header="Posts" content={<Posts />} />}
                />
                <Route
                    path="/published/posts/id/:postId"
                    element={<PageWrapper content={<PostPage />} usePaper />}
                />
                <Route
                    path="published/books"
                    element={<PageWrapper header="Books" content={<Books />} />}
                />
                <Route
                    path="/published/books/id/:bookId"
                    element={<PageWrapper content={<BookPage />} usePaper />}
                />
                <Route
                    path="/published/articles"
                    element={
                        <PageWrapper header="Articles" content={<Articles />} />
                    }
                />
                <Route
                    path="/published/articles/id/:articleId"
                    element={<PageWrapper content={<ArticlePage />} usePaper />}
                />
                {/* <Route path="/admin/compose" element={<Compose />} /> */}
                <Route
                    path="/events"
                    element={
                        <PageWrapper header="Events" content={<Events />} />
                    }
                />
                <Route
                    path="/about"
                    element={
                        <PageWrapper
                            header="About"
                            content={<About />}
                            usePaper
                        />
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PageWrapper header="Contact" content={<Contact />} />
                    }
                />
            </Routes>
            <Footer />
        </Box>
    );
}

export default App;
