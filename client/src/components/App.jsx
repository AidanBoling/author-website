import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import Navbar from './Navbar';
import Home from './pages/Home';
import Published from './pages/Published';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Compose from './pages/Compose';
import About from './pages/About';
import Contact from './pages/Contact';

// import '../css/styles.css';
// import '../css/App.css';

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/published" element={<Published />} />
                    <Route path="/published/blog" element={<Blog />} />
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/compose" element={<Compose />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
