'use client';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Box } from '@mui/material';
import ResponsiveImageContainer from '@/main/components/ResponsiveImageContainer';

export default function PeriodicalsBody(props) {
    const image = props.periodical.image;
    // TODO: source = props.periodical.image.fromDB.? || props.periodical.image.url

    // if props.periodical.image.orientation = landscape, then no float; use height = 400 (max height)
    // and calculate new width based on image dims
    // imageSize =

    // if props.image.orientation = horiz, then use width --> (max) width = 500, calculate new height
    // set float = props.imageFloat || 'left'
    const imageSize = props.imageSize
        ? props.imageSize
        : { width: 500, height: 400 };
    return (
        <Box mt={'2rem'}>
            {props.periodical.image && (
                <ResponsiveImageContainer float={props.imageFloat}>
                    <Image
                        src={image.fromDB ? image.fromDB.url : image.url}
                        alt={
                            image.fromDB ? image.fromDB.altText : image.altText
                        }
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
        </Box>
    );
}
