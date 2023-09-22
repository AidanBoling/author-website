'use client';
import { Box } from '@mui/material';

export default function Background(props) {
    const footerHeight = '200px';
    return (
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
            {props.children}
        </Box>
    );
}
