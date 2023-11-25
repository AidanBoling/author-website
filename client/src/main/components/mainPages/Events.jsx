'use client';
import { ErrorBoundary } from 'react-error-boundary';
import ItemsListError from '@/main/components/errors/ItemsListError';
import Link from 'next/link';
import { Link as MuiLink, Box, Stack, Typography } from '@mui/material';
import pageContent from '../../content/eventsContent.json';
import authorInfo from '../../content/authorDetails.json';

function Events({ children }) {
    return (
        <>
            <Box sx={{ mt: '2rem', mb: '5rem' }}>
                {pageContent.headerText.intro.map((paragraph, i) => (
                    <Typography key={i} mb={'2rem'}>
                        {paragraph}
                    </Typography>
                ))}
                {pageContent.headerText.bullets.map((paragraph, i) => (
                    <Box key={i} component="p" m={0} mb={'1rem'} ml={'4rem'}>
                        <Typography
                            variant="h6"
                            component="span"
                            mb={0}
                            fontStyle={'italic'}>
                            {paragraph.title}
                        </Typography>
                        <Typography component="span">
                            {paragraph.body}
                        </Typography>
                    </Box>
                ))}
                <Box my={'3rem'}>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{ fontWeight: 480 }}>
                        {/* <b> */}
                        Interested in booking {authorInfo.author.title}
                        {authorInfo.author.lName}? {/* </b> */}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{ fontWeight: 260 }}>
                        <MuiLink
                            component={Link}
                            href={'/contact'}
                            underline="none"
                            sx={{
                                marginLeft: '1ch',
                                ':hover': { color: 'primary.dark' },
                            }}>
                            Contact her
                        </MuiLink>{' '}
                        for fees and pricing.
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h3" component="h3" mb="1.5rem" color="primary">
                Upcoming Events
            </Typography>
            <Stack spacing={3}>
                <ErrorBoundary fallback={<ItemsListError />}>
                    {children}
                </ErrorBoundary>
            </Stack>
        </>
    );
}

export default Events;
