'use client';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Box, Divider } from '@mui/material';
import ResponsiveImageContainer from '@/main/components/ResponsiveImageContainer';

export default function PeriodicalsBody(props) {
    const imageSize = props.imageSize
        ? props.imageSize
        : { width: 500, height: 400 };
    return (
        <Box mt={'2rem'}>
            {props.periodical.image && (
                <ResponsiveImageContainer float={props.imageFloat}>
                    <Image
                        src={props.periodical.image.url}
                        alt={props.periodical.image.altText}
                        width={imageSize.width}
                        height={imageSize.height}
                        priority
                        style={{
                            width: 'auto',
                            objectFit: 'cover',
                        }}
                    />
                </ResponsiveImageContainer>
            )}
            <Box>
                {props.content ? (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(props.content),
                        }}
                    />
                ) : (
                    props.contentFallback
                )}
            </Box>
            {props.children}
            <Divider
                sx={{
                    width: '95%',
                    maxWidth: '800px',
                    pt: '5rem',
                    mx: 'auto',
                }}
            />
        </Box>
    );
}
