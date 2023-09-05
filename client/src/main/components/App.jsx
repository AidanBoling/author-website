import { Routes, Route } from 'react-router-dom';
import '../css/styles.css';
import reactLogo from '../../assets/react.svg';
import Navbar from './Navbar';
import Home from './pages/Home';
import Published from './pages/Published';
import Books from './pages/Books';
import BookPage from './pages/BookPage';
import Articles from './pages/Articles';
import Posts from './pages/Posts';
import PostPage from './pages/PostPage';
import Compose from './pages/Compose';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/published" element={<Published />} />
                <Route path="/published/posts" element={<Posts />} />
                <Route
                    path="/published/posts/id/:postId"
                    element={<PostPage />}
                />
                <Route path="published/books" element={<Books />} />
                <Route
                    path="/published/books/id/:bookId"
                    element={<BookPage />}
                />
                <Route
                    path="/published/books/:bookName"
                    element={<BookPage />}
                />
                <Route path="/published/articles" element={<Articles />} />

                {/* <Route path="/admin/compose" element={<Compose />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

export default App;
