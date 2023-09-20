'use client';

import dynamic from 'next/dynamic';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeWrapper from '../../main/components/style/ThemeWrapper';
import '../../main/css/styles.css';

const App = dynamic(() => import('../../main/components/App'), { ssr: false });

export default function Page() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<ThemeWrapper element={<App />} />} />
            </Routes>
        </BrowserRouter>
    );
}
