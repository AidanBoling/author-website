'use client';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Box } from '@mui/material';
import ResponsiveImageContainer from '@/main/components/ResponsiveImageContainer';

// Image defaults: portrait, left-float

export default function PeriodicalsBody(props) {
    const image = props.periodical.image;
    const dims = image && image.fromDB?.dimensions;
    const orientation =
        (image && image.fromDB && image.fromDB.orientation) || 'portrait';

    let imageSize = { width: 350, height: 400 }; // default image size => max height (landscape), max width (portrait)
    let imageSx;
    let float;
    let max;

    if (orientation === 'portrait') {
        const portraitMaxWidth = imageSize.width;
        float = props.imageFloat || 'left';
        imageSx = {
            height: 'auto',
            objectFit: 'cover',
        };

        if (dims) {
            const scaledHeight = (dims.height / dims.width) * portraitMaxWidth;
            imageSize = { width: portraitMaxWidth, height: scaledHeight };
            max = { maxWidth: portraitMaxWidth };
        }
    }

    if (orientation === 'landscape') {
        const landscapeMaxHeight = imageSize.height;
        float = false;
        imageSx = {
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
        };

        if (dims) {
            const scaledWidth = (dims.width / dims.height) * landscapeMaxHeight;
            imageSize = { width: scaledWidth, height: landscapeMaxHeight };
            max = { maxHeight: landscapeMaxHeight };
        }
    }

    return (
        <Box mt={'2rem'}>
            {image && (
                <ResponsiveImageContainer float={float} max={max}>
                    <Image
                        src={image.fromDB ? image.fromDB.url : image.url}
                        alt={
                            image.fromDB ? image.fromDB.altText : image.altText
                        }
                        width={imageSize.width}
                        height={imageSize.height}
                        priority
                        style={{
                            ...imageSx,
                            // width: 'auto',
                            // height: 'auto',
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
        </Box>
    );
}
