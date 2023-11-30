'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
    Container,
    Box,
    Paper,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import InnerPageContainer from '../layout/InnerPageContainer';
import pageContent from '@/main/content/homeContent.json';
import BasicImageComponent from '@/main/components/BasicImageComponent';

function Home(props) {
    const headerImageMask = {
        xs: 'linear-gradient(to top, black, black 55%, rgba(0, 0, 0, 0.7) 58%, rgba(0, 0, 0, 0.5) 59%, rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0.25) 61.5%, rgba(0, 0, 0, 0.1) 65.5%, rgba(0, 0, 0, 0.05) 75%, 86%, transparent 95%)',
        sxs: 'linear-gradient(to top, black, black 58%, rgba(0, 0, 0, 0.7) 61%, rgba(0, 0, 0, 0.6) 63%, rgba(0, 0, 0, 0.5) 64%, rgba(0, 0, 0, 0.35) 66%, rgba(0, 0, 0, 0.25) 67.5%, rgba(0, 0, 0, 0.1) 71.5%, rgba(0, 0, 0, 0.05) 76%, 81%, transparent 95%)',
        sm: 'linear-gradient(to top, black, black 55%, rgba(0, 0, 0, 0.7) 59%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.5) 61%, rgba(0, 0, 0, 0.35) 63%, rgba(0, 0, 0, 0.25) 64%, rgba(0, 0, 0, 0.1) 67%, rgba(0, 0, 0, 0.05) 70%, transparent 95%)',
        md: 'linear-gradient(to left, black 33%, rgba(0, 0, 0, 0.25) 33%, rgba(0, 0, 0, 0.2) 34%, rgba(0, 0, 0, 0.15) 37%, rgba(0, 0, 0, 0.1) 43%, rgba(0, 0, 0, 0.08) 48%, rgba(0, 0, 0, 0.06) 54%, rgba(0, 0, 0, 0.04) 61%, rgba(0, 0, 0, 0.025) 67%, rgba(0, 0, 0, 0.005) 70%, rgba(0, 0, 0, 0.0025) 70.5%, 71%, transparent 73.5%)',
    };

    const taglineFontSize = {
        xs: '1.50rem !important',
        sxs: '1.55rem !important',
        sm: '1.85rem !important',
        lg: '2.25rem !important',
    };

    return (
        <Box sx={{ mb: '1rem', mt: '0', overflowX: 'clip' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: 'minmax(580px, 75vh)',
                    gridTemplateColumns: '1fr 1.1fr',
                    alignItems: 'start',
                    mt: '0',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        maxWidth: { md: '66vw', lg: '66vw' },
                        gridRow: '1/-1',
                        gridColumn: '1/-1',
                        height: '100%',
                        zIndex: 2,
                    }}>
                    <Box
                        sx={{
                            textAlign: { xs: 'center', md: 'left' },
                            mb: '2rem',
                            mt: {
                                xs: '17vw',
                                sxs: 'calc(10px + 10vw)',
                                sm: '58px',
                                md: '13vh',
                            },
                            ml: { xs: '5vw', md: '5vw', lg: '5vw' },
                            mr: { xs: '5vw', md: '3vw', xl: '3vw' },
                            fontSize: {
                                ...taglineFontSize,
                            },
                        }}>
                        <Typography
                            variant="h2"
                            component="p"
                            sx={{
                                fontWeight: { xs: 270, sm: 250 },

                                fontSize: {
                                    ...taglineFontSize,
                                },
                                mb: { xs: '.5rem', md: '1rem' },
                            }}>
                            {pageContent.headline.primary}
                        </Typography>
                        <Typography
                            variant="h2"
                            component="p"
                            color="primary.dark"
                            sx={{
                                fontWeight: { xs: 300, md: 275 },

                                fontSize: {
                                    ...taglineFontSize,
                                },
                            }}>
                            {pageContent.headline.secondary}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        height: { xs: '90%', sm: '100%' },
                        // width: { md: '90%' },
                        gridRow: '1/-1',
                        gridColumn: '1/-1',
                        position: 'relative',
                        // display: 'flex',
                        // marginLeft: { md: '7vw', lg: '18vw' },
                        marginTop: { xs: 'auto', sm: '0' },
                    }}>
                    <Box
                        sx={{
                            height: '100%',
                            // marginTop: { xs: 'auto', sm: '0' },
                            maskImage: headerImageMask,
                            WebkitMaskImage: headerImageMask,
                            maskRepeat: 'no-repeat',
                        }}>
                        <Image
                            src={pageContent.titleImage.url}
                            alt={pageContent.titleImage.altText}
                            fill
                            priority
                            sizes="100vw"
                            style={{
                                objectFit: 'cover',
                                objectPosition: '85% 45%',
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            <Box
                className="hero bg"
                sx={{
                    mt: '-.5px',
                }}>
                <Paper elevation={10} variant="hero" square>
                    <Container
                        className="hero content-container"
                        maxWidth={'lg'}
                        sx={{ mt: '0' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                px: { xs: '.5rem', sxs: '1rem', sm: '2rem' },
                                py: '5rem',
                                mx: 'auto',
                            }}>
                            <BasicImageComponent
                                src={pageContent.heroBook.imageUrl}
                                alt="Book cover"
                                priority
                                sizes="350px"
                                sx={{
                                    width: { xs: '290px', sxs: '325px' },
                                    aspectRatio: '0.67',
                                    // height: 'calc(325px / 0.67)',
                                    mx: { xs: 'auto' },
                                    borderRadius: '.4rem',
                                }}
                            />

                            <Stack
                                gap={3}
                                className="hero content"
                                sx={{
                                    flexGrow: 1,
                                    ml: { xs: 0, md: '3rem' },
                                    mt: { xs: '2.5rem', md: 0 },
                                }}>
                                <Typography
                                    variant="h3"
                                    component="p"
                                    color={'lightgold.main'}
                                    textAlign={'center'}>
                                    {pageContent.heroBook.title}
                                </Typography>
                                <Typography>
                                    {pageContent.heroBook.summary}
                                </Typography>
                                <Box mt={'2rem'}>
                                    <Stack
                                        gap={4}
                                        sx={{ width: '200px', mx: 'auto' }}>
                                        <Button
                                            component={Link}
                                            href={pageContent.heroBook.pagePath}
                                            variant="outlined"
                                            color="lightgold">
                                            Learn More
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="lightgold">
                                            Order on Amazon
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Container>
                </Paper>
            </Box>
            <InnerPageContainer
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // px: { sxs: '1.5rem', sm: '2rem' },
                    width: '100%',
                    pb: '40px',
                }}>
                {props.children}
            </InnerPageContainer>
        </Box>
    );
}

export default Home;

// TEMP archive ---------------------------

// const HeroSectionPaper = styled(Paper)(({ theme }) => ({
//     width: '100%',
//     height: '100%',
//     backgroundColor:
//         theme.palette.mode === 'dark'
//             ? `${alpha(theme.palette.forestgreen.main, 0.95)}`
//             : `${alpha(theme.palette.forestgreen.light, 0.95)}`,
//     color: theme.palette.mode === 'light' && theme.palette.primary.contrastText,
// }));

//
// const galleryContainerSX = {
//     display: 'flex',
//     gap: '1.5rem',
//     flexWrap: 'wrap',
//     border: '1px solid primary.main',
//     borderRadius: '.4rem',
//     padding: '2rem',
// };

//
//
// {articles && (
//     <>

//         {/* <Button
//             component={Link}
//             href={'/articles'}
//             size={'large'}
//             sx={{
//                 flexShrink: 0,
//                 transitionDuration: '50ms',
//                 pl: '1.5rem',
//                 backgroundColor: 'transparent',
//                 '&:hover': {
//                     color: 'primary.light',
//                     backgroundColor: 'greyAlpha10.main',
//                 },
//             }}>
//             More
//             <ArrowRightAltIcon
//                 sx={{ pl: '.25rem', fontSize: '2rem' }}
//             />
//         </Button> */}
//     </>
// )}

//
// {/* <Box
//     sx={{
//         contain: 'content',
//         flexShrink: 0,
//         borderRadius: '.4rem',
//         width: '325px',
//         aspectRatio: '0.67',
//         // height: 'calc(325px / 0.67)',
//         mx: { xs: 'auto' },
//     }}>
//     <Image
//         src={pageContent.heroBook.imageUrl}
//         alt="Book cover"
//         priority={true}
//         fill
//         sizes="350px"
//         style={{
//             objectFit: 'cover',
//         }}
//     />
// </Box> */}
//

//
//
// xs: 'linear-gradient(to top, black, black 45%, rgba(0, 0, 0, 0.7) 60%, 66%, transparent 80%)',
// sxs: 'linear-gradient(to top, black, black 45%, rgba(0, 0, 0, 0.7) 64%, 72%, transparent 82%)',
// sxs: 'linear-gradient(to top, black, black 60%, rgba(0, 0, 0, 0.7) 61%, rgba(0, 0, 0, 0.6) 63%, rgba(0, 0, 0, 0.5) 64%, rgba(0, 0, 0, 0.35) 66%, rgba(0, 0, 0, 0.25) 68.5%, rgba(0, 0, 0, 0.1) 71.5%, rgba(0, 0, 0, 0.05) 76%, 82%, transparent 95%)',
// sm: 'linear-gradient(to top, black, black 45%, rgba(0, 0, 0, 0.7) 58%, 62%, transparent 76%)',
// sm: 'linear-gradient(to top, black, black 50%, rgba(0, 0, 0, 0.7) 62%, rgba(0, 0, 0, 0.6) 63%, rgba(0, 0, 0, 0.5) 64%, rgba(0, 0, 0, 0.35) 66%, rgba(0, 0, 0, 0.25) 67%, rgba(0, 0, 0, 0.1) 69%, rgba(0, 0, 0, 0.05) 72%, transparent 95%)',
// md: 'linear-gradient(to left, black, black, 45%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.35), transparent 68%)',
// lg: 'linear-gradient(to left, black, black, rgba(0, 0, 0, 0.7), transparent, 88%, transparent)',
// md: 'linear-gradient(to left, black, black, 42%, rgba(0, 0, 0, 0.4) 49%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, .10) 61%, transparent 78%)',
// md: 'linear-gradient(to left, black 33%, rgba(0, 0, 0, 0.2) 33%, rgba(0, 0, 0, 0.15), 49%, rgba(0, 0, 0, 0.1), 69%, rgba(0, 0, 0, 0.05), 85%, transparent 90%)',
// md: 'rgba(0, 0, 0, 0.2), linear-gradient(to left, hsl(0, 0%, 0%) 0%, hsla(0, 0%, 0%, 0.738) 19%, hsla(0, 0%, 0%, 0.541) 34%, hsla(0, 0%, 0%, 0.382) 47%, hsla(0, 0%, 0%, 0.278) 56.5%, hsla(0, 0%, 0%, 0.194) 65%, hsla(0, 0%, 0%, 0.126) 73%, hsla(0, 0%, 0%, 0.075) 80.2%, hsla(0, 0%, 0%, 0.042) 86.1%, hsla(0, 0%, 0%, 0.021) 91%, hsla(0, 0%, 0%, 0.008) 95.2%, hsla(0, 0%, 0%, 0.002) 98.2%, hsla(0, 0%, 0%, 0) 100%)',
// md: 'linear-gradient(to left, hsl(0, 0%, 0%) 33%, hsla(0, 0%, 0%, 0.2) 33%, hsla(0, 0%, 0%, 0.094) 60%, hsla(0, 0%, 0%, 0.026) 68%,  hsla(0, 0%, 0%, 0) 100%)',
// md: 'linear-gradient(to left, black 33%, rgba(0, 0, 0, 0.25) 33%, rgba(0, 0, 0, 0.2) 34%, rgba(0, 0, 0, 0.15) 38%, rgba(0, 0, 0, 0.1) 42%, rgba(0, 0, 0, 0.08) 48%, rgba(0, 0, 0, 0.06) 54%, rgba(0, 0, 0, 0.04) 61%, rgba(0, 0, 0, 0.025) 66%, rgba(0, 0, 0, 0.005) 70%, rgba(0, 0, 0, .0025) 73%, rgba(0, 0, 0, 0.001) 73.5%, transparent 80%)',
// md: 'linear-gradient(to left, black 33%, rgba(0, 0, 0, 0.25) 33%, rgba(0, 0, 0, 0.2) 33%, rgba(0, 0, 0, 0.18) 33%, rgba(0, 0, 0, 0.14) 37%, rgba(0, 0, 0, 0.12) 41%, rgba(0, 0, 0, 0.11) 50%, rgba(0, 0, 0, 0.1) 52%, rgba(0, 0, 0, 0.09) 57%, rgba(0, 0, 0, 0.08) 62%, rgba(0, 0, 0, 0.07) 64%, rgba(0, 0, 0, 0.06) 66%, rgba(0, 0, 0, 0.04) 68%, rgba(0, 0, 0, 0.025) 69%, rgba(0, 0, 0, 0.0025) 70.5%, 71%, transparent 73.5%)',
