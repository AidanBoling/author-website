'use client';
import { ErrorBoundary } from 'react-error-boundary';
import ItemsListError from '@/main/components/errors/ItemsListError';
import Link from 'next/link';
import {
    Link as MuiLink,
    Box,
    Stack,
    Typography,
    Divider,
} from '@mui/material';
import pageContent from '../../content/eventsContent.json';
import authorInfo from '../../content/authorDetails.json';

function Events({ children }) {
    return (
        <>
            <Box sx={{ mt: '2rem', mb: '3rem' }}>
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
                <ToggleCallout
                    summaryContent={
                        <Typography component="span">
                            {authorInfo.author.title}
                            {authorInfo.author.lName}&apos;s past speaking
                            engagements
                        </Typography>
                    }>
                    <Box
                        component="ul"
                        sx={{
                            paddingInlineStart: {
                                xs: '1.5rem',
                                sxs: '3rem',
                            },
                        }}>
                        {pageContent.headerText.speakingList.map((item, i) => (
                            <Typography
                                key={i}
                                component="li"
                                sx={{
                                    listStylePosition: 'outside',
                                    marginLeft: { sxs: '1rem' },
                                    mb: '.8rem',
                                    paddingLeft: '.5rem',
                                }}>
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </ToggleCallout>
                <Box my={'3rem'}>
                    <Typography
                        variant="h5"
                        component="h4"
                        sx={{
                            fontWeight: 480,
                            mt: '3rem',
                            mb: '1rem',
                        }}>
                        Interested in booking {authorInfo.author.title}
                        {authorInfo.author.lName}?
                    </Typography>
                    <Typography>
                        For speaking engagements,
                        <MuiLink
                            component={Link}
                            href={'/contact'}
                            underline="none"
                            sx={{
                                marginLeft: '1ch',
                                ':hover': { color: 'primary.dark' },
                            }}>
                            contact her
                        </MuiLink>{' '}
                        for fees and pricing. For agritourism consulting
                        services, see general pricing below.
                    </Typography>
                    <ToggleCallout
                        summaryContent={
                            <Typography component="span">
                                Agritourism Consultation Pricing
                            </Typography>
                        }>
                        <Typography>
                            {pageContent.headerText.consulting.intro}
                        </Typography>
                        <Typography
                            sx={{
                                marginY: '2rem',
                            }}>
                            <Typography
                                variant="h6"
                                component="span"
                                mb={0}
                                mr={'.8ch'}
                                sx={{
                                    fontStyle: 'italic',
                                    lineHeight: '1.5rem',
                                }}>
                                {
                                    pageContent.headerText.consulting.special
                                        .title
                                }
                            </Typography>
                            <Typography component="span">
                                {pageContent.headerText.consulting.special.text}
                            </Typography>
                        </Typography>
                        <Typography>
                            {pageContent.headerText.consulting.pricing.intro}
                        </Typography>
                        <Box
                            component="ul"
                            sx={{
                                paddingInlineStart: {
                                    xs: '1.5rem',
                                    sxs: '3rem',
                                },
                            }}>
                            {pageContent.headerText.consulting.pricing.list.map(
                                (item, i) => (
                                    <Typography
                                        key={i}
                                        component="li"
                                        sx={{
                                            listStylePosition: 'outside',
                                            marginLeft: { sxs: '1rem' },
                                            mb: '.8rem',
                                            paddingLeft: '.5rem',
                                        }}>
                                        {item}
                                    </Typography>
                                )
                            )}
                        </Box>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{ fontWeight: 260, mt: '2rem' }}>
                            <MuiLink
                                component={Link}
                                href={'/contact'}
                                underline="none"
                                sx={{
                                    ':hover': { color: 'primary.dark' },
                                }}>
                                Contact her
                            </MuiLink>{' '}
                            for more info or to book your consultation.
                        </Typography>
                    </ToggleCallout>
                </Box>
                {/* <Divider
                    sx={{ width: '60%', marginX: 'auto', marginTop: '3rem' }}
                /> */}
            </Box>
            <Divider
                sx={{
                    width: '60%',
                    marginX: 'auto',
                    marginY: '3rem',
                    marginBottom: '6rem',
                }}
            />
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

function ToggleCallout({ summaryContent, children }) {
    return (
        <Box
            component="details"
            sx={{
                borderWidth: '1px',
                borderColor: 'primary.dark',
                borderStyle: 'solid',
                borderRadius: '.20rem',
                marginBottom: '1.5rem',
                marginTop: '.5rem',
            }}>
            <Box
                component="summary"
                sx={{
                    listStylePosition: 'outside',
                    marginX: '1.6rem',
                    marginY: '.8rem',
                    paddingLeft: '8px',
                }}>
                {summaryContent}
            </Box>

            <Box
                sx={{
                    margin: '1.5rem',
                    mt: '.75rem',
                    mb: '1.75rem',
                    paddingLeft: '8px',
                }}>
                <Divider sx={{ mb: '1.25rem' }} />
                {children}
            </Box>
        </Box>
    );
}

export default Events;

//
//
// TEMP Archive ------------------------------

// {/* <Box
//                         component="details"
//                         sx={{
//                             borderWidth: '1px',
//                             borderColor: 'primary.dark',
//                             borderStyle: 'solid',
//                             borderRadius: '.20rem',
//                         }}>
//                         <Typography
//                             component="summary"
//                             sx={{
//                                 listStylePosition: 'outside',
//                                 marginLeft: '1.6rem',
//                                 marginY: '.8rem',
//                                 paddingLeft: '8px',
//                             }}>
//                             See a list of {authorInfo.author.title}
//                             {authorInfo.author.lName}&apos;s past speaking
//                             engagements
//                         </Typography>
//                         <Box component="ul" sx={{ ml: '1.5rem', my: '1rem' }}>
//                             {pageContent.headerText.speakingList.map(
//                                 (item, i) => (
//                                     <Typography
//                                         key={i}
//                                         component="li"
//                                         sx={{
//                                             listStylePosition: 'outside',
//                                             marginLeft: '1rem',
//                                             mb: '.8rem',
//                                             paddingLeft: '.5rem',
//                                         }}>
//                                         {item}
//                                     </Typography>
//                                 )
//                             )}
//                         </Box>
//                     </Box> */}
