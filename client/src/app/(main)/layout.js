'use client';
import { Box, GlobalStyles } from '@mui/material';
import Navbar from '@/main/components/Navbar';
import Footer from '@/main/components/Footer';
import ThemeWrapper from '@/main/components/style/ThemeWrapper';
import Background from '../../main/components/style/Background';
import '@/main/styles/styles.css';
// import ThemeRegistry from '../ThemeRegistry';
import { css } from '@emotion/react';
// import {
//     lightThemeOptions,
//     darkThemeOptions,
// } from '@/main/components/style/theme';

// ${lightThemeOptions.palette
//     .background.default}

export default function MainLayout({ children }) {
    const footerHeight = '200px';

    return (
        <ThemeWrapper>
            <Background>
                <Navbar />
                {children}
            </Background>
            <Footer height={footerHeight} />
        </ThemeWrapper>
    );
}
