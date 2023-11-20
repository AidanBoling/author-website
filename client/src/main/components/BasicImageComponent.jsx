'use client';
import Image from 'next/image';
import Box from '@mui/material/Box';

export default function BasicImageComponent({
    src,
    alt,
    priority,
    sizes,
    sx,
    iSx,
}) {
    return (
        <Box
            sx={{
                contain: 'content',
                flexShrink: 0,
                ...sx,
            }}>
            <Image
                src={src}
                alt={alt}
                priority={priority}
                sizes={sizes}
                fill
                style={{
                    objectFit: 'cover',
                    ...iSx,
                }}
            />
        </Box>
    );
}
