'use client';
import '../../main/css/styles.css';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeWrapper from './components/style/ThemeWrapper';

export default function MainLayout({
    children, // will be a page or nested layout
}) {
    const footerHeight = '200px';

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}

            <ThemeWrapper>
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

                    {children}
                </Box>
                <Footer height={footerHeight} />
            </ThemeWrapper>
        </section>
    );
}
