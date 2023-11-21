'use client';
import Image from 'next/image';
import { Box } from '@mui/material';
import bgMountains from '@/public/green-gold-abstract-mountains_transparent-crop.png';
// import { css } from '@emotion/react';

export default function Background(props) {
    const footerHeight = '140px';

    return (
        <>
            <Box
                component="div"
                // className="bgmountains"
                sx={{
                    position: 'relative',

                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: `calc(100vh - ${footerHeight})`,
                    pb: {
                        // xs: '75px',
                        xs: '125px',
                        lg: '175px',
                    },
                }}>
                <Box
                    sx={{
                        width: '100%',
                        height: 'min-content',
                        position: 'absolute',
                        bottom: '0',
                        lineHeight: '0',
                    }}>
                    <Image
                        alt="modern abstract green and gold mountains digital art"
                        src={bgMountains}
                        placeholder="blur"
                        quality={100}
                        sizes="100vw"
                        style={{
                            minWidth: '900px',
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
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
