'use client';
// import { useState } from 'react';
import { Card, Skeleton } from '@mui/material';

function GalleryCardSkeleton(props) {
    return (
        <Card
            className={'card gallery skeleton resource-card media'}
            sx={{
                width: '350px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Skeleton
                variant="rectangle"
                sx={{
                    height: 200,
                    width: 350,
                    mr: '1rem',
                    flexShrink: 0,
                    px: '1rem',
                }}
            />

            <div className="resource-card content">
                <Skeleton
                    variant="text"
                    sx={{
                        fontSize: '1.5rem',
                        marginBottom: '1.25rem',
                    }}
                />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </div>
        </Card>
    );
}

export default ResourceCardSkeleton;
