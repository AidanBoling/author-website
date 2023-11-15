'use client';
import { Box } from '@mui/material';
// import { css } from '@emotion/react';

export default function Background(props) {
    const footerHeight = '140px';

    return (
        <>
            <Box
                component="div"
                className="bgmountains"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: `calc(100vh - ${footerHeight})`,
                    pb: { xs: '75px', sm: '125px', lg: '175px' },
                }}>
                <Box
                    className="bg-color"
                    sx={{
                        width: '100vw',
                        height: '100%',
                        position: 'fixed',
                        zIndex: '-1',
                    }}
                />
                <Box
                    className="bg pattern bg-color"
                    sx={{
                        width: '100vw',
                        height: '100%',
                        position: 'fixed',
                        backgroundAttachment: 'fixed',
                        opacity: '.15',
                        zIndex: '-1',
                    }}
                />
                {props.children}
            </Box>
        </>
    );
}
