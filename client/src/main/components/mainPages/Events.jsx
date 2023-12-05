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
                <Box component="ul" p={0} mb={'2rem'}>
                    {pageContent.headerText.bullets.map((paragraph, i) => (
                        <Box
                            key={i}
                            component="li"
                            sx={{
                                m: 0,
                                mb: '1rem',
                                ml: { sxs: '4rem' },
                                listStyle: 'none',
                            }}>
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
                </Box>
                <Box my={'3rem'}>
                    <Box
                        component="details"
                        sx={{
                            borderWidth: '1px',
                            borderColor: 'primary.dark',
                            borderStyle: 'solid',
                            borderRadius: '.20rem',
                        }}>
                        <Typography
                            component="summary"
                            sx={{
                                listStylePosition: 'outside',
                                marginLeft: '1.6rem',
                                marginY: '.8rem',
                                paddingLeft: '8px',
                            }}>
                            See a list of {authorInfo.author.title}
                            {authorInfo.author.lName}&apos;s past speaking
                            engagements
                        </Typography>
                        <Box component="ul" sx={{ ml: '1.5rem', my: '1rem' }}>
                            {pageContent.headerText.speakingList.map(
                                (item, i) => (
                                    <Typography
                                        key={i}
                                        component="li"
                                        sx={{
                                            listStylePosition: 'outside',
                                            marginLeft: '1rem',
                                            mb: '.8rem',
                                            paddingLeft: '.5rem',
                                        }}>
                                        {item}
                                    </Typography>
                                )
                            )}
                        </Box>
                    </Box>
                    <Box my={'1.5rem'}>
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ fontWeight: 480 }}>
                            Interested in booking {authorInfo.author.title}
                            {authorInfo.author.lName}?
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
