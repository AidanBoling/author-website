'use client';
import Image from 'next/image';
import { Box } from '@mui/material';
import pageContent from '@/main/content/siteContent.json';
// import bgMountains from '@/public/green-gold-abstract-mountains_transparent-crop.png';
// import { css } from '@emotion/react';

export default function Background(props) {
    const footerHeight = '150px';

    return (
        <>
            <Box
                // className="bgmountains"
                sx={{
                    position: 'relative',

                    display: 'flex',
                    flexDirection: 'column',
                    width: '100vw',
                    minHeight: `calc(100vh - ${footerHeight})`,
                    overflowX: 'hidden',
                    pb: {
                        // xs: '75px',
                        xs: '125px',
                        lg: '175px',
                        xl: '325px',
                    },
                }}>
                <Box
                    sx={{
                        width: '100%',
                        // minWidth: '900px',
                        // maxWidth: '100%',
                        height: 'min-content',
                        position: 'absolute',
                        bottom: '0',
                        lineHeight: '0',
                    }}>
                    <Image
                        // src={bgMountains}
                        src={pageContent.bgImages.mountains.url}
                        alt={pageContent.bgImages.mountains.altText}
                        width={2048}
                        height={297}
                        quality={100}
                        sizes="(max-width: 900px) 900px, 100vw"
                        style={{
                            minWidth: '900px',
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            // position: 'absolute',
                            // bottom: '0',
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
