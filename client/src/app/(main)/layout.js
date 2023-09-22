'use client';
import { Box } from '@mui/material';
import Navbar from '@/main/components/Navbar';
import Footer from '@/main/components/Footer';
import ThemeWrapper from '@/main/components/style/ThemeWrapper';
import Background from '../../main/components/style/Background';
import '@/main/styles/styles.css';

export default function MainLayout({ children }) {
    const footerHeight = '200px';

    return (
        <ThemeWrapper>
            <Box
                component="div"
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
                    }}
                />
                <Navbar />
                {children}
            </Box>

            <Footer height={footerHeight} />
        </ThemeWrapper>
    );
}
