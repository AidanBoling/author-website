import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import Header from './Header';
import Compose from './pages/Compose';
import Home from './pages/Home';
// import '../css/styles.css';
// import '../css/App.css';

function App() {
    return (
        <div>
            <Header />
            <div className="main">
                <Home />
                <Compose />
            </div>
        </div>
    );
}

export default App;
