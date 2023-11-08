'use client';
import { Box, Typography, Divider } from '@mui/material';

export default function PeriodicalsHeading(props) {
    return (
        <Box
            mb={2}
            sx={{
                display: 'flex',
                alignItems: 'baseline',
                flexDirection: 'column',
            }}>
            <Divider sx={{ mx: 'auto', my: '.5rem', width: '85%' }} />
            <Typography
                variant="h3"
                component="h2"
                sx={{ mb: '.5rem', mt: '1rem' }}>
                {props.title}
            </Typography>
            <Typography
                variant="subheading1"
                component="p"
                color={'grey.main'}
                mb={2}>
                <i>Published on </i>
                {new Date(props.published).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Typography>
            {/* <Typography variant="subheading1" component="p" color='text.secondary'>Updated on {post.updatedAt}</Typography> */}
        </Box>
    );
}
