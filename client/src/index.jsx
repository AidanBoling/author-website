import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeWrapper from './main/components/style/ThemeWrapper';
import './main/css/styles.css';

import App from './main/components/App';
import AdminApp from './site_admin/components/App';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/*" element={<ThemeWrapper element={<App />} />} />
        </Routes>
    </BrowserRouter>
    // </React.StrictMode>
);
