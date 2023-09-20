import { useState } from 'react';
import { Card, Skeleton } from '@mui/material';

function ResourceCardSkeleton(props) {
    // const [cardClassAdditions, setCardClass] = useState('');
    let cardClassAdditions = '';
    if (props.hasMedia) {
        cardClassAdditions = 'media';
    }

    return (
        <Card
            className={`card wide skeleton resource-card ${cardClassAdditions}`}
            sx={{
                width: '100%',
                padding: '1rem',
            }}>
            {props.hasMedia && (
                <Skeleton
                    variant="rectangle"
                    height={'302px'}
                    sx={{
                        width: 200,
                        mr: '1rem',
                        flexShrink: 0,
                        px: '1rem',
                    }}
                />
            )}

            <div className="resource-card content">
                <Skeleton
                    variant="text"
                    sx={{
                        fontSize: '2.5rem',
                        marginBottom: '1.5rem',
                    }}
                />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton
                    variant="rounded"
                    width={100}
                    sx={{ fontSize: '1.75rem', marginTop: '1rem' }}
                />
            </div>
        </Card>
    );
}

export default ResourceCardSkeleton;
