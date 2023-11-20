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
import pageContent from '../../content/homeContent.json';
import BasicImageComponent from '@/main/components/BasicImageComponent';

function Home(props) {
    const headerImageMask = {
        xs: 'linear-gradient(to top, black, black, rgba(0, 0, 0, 0.7), transparent, transparent)',
        md: 'linear-gradient(to left, black, black, rgba(0, 0, 0, 0.7), transparent, 85%, transparent)',
    };

    return (
        <Container sx={{ mb: '1rem', mt: '0' }} maxWidth={'xl'} disableGutters>
            <Container
                sx={{
                    display: 'grid',
                    gridTemplateRows: 'minmax(500px, 70vh)',
                    gridTemplateColumns: '1fr',
                    alignItems: 'start',
                    mt: '0',
                }}
                maxWidth={'xl'}
                disableGutters>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        maxWidth: { md: '60vw', lg: '50vw' },
                        gridRow: '1/-1',
                        gridColumn: '1/-1',
                        height: '100%',
                        zIndex: 1,
                    }}>
                    <Typography
                        variant="h2"
                        component="p"
                        sx={{
                            textAlign: 'center',
                            m: '2rem',
                            mt: { xs: '10vh', md: '20vh' },
                            mx: '5vw',
                        }}>
                        {pageContent.headline.primary}
                        <Typography
                            variant="h2"
                            component="span"
                            color="primary.dark">
                            {pageContent.headline.secondary}
                        </Typography>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: '100%',
                        gridRow: '1/-1',
                        gridColumn: '1/-1',
                        position: 'relative',
                        zIndex: '0',
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
                        style={{ width: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Container>

            <Container
                className="hero bg"
                maxWidth={'xl'}
                disableGutters
                sx={{
                    mt: '0',
                }}>
                <Paper elevation={10} variant="hero" square>
                    <Container
                        className="hero content-container"
                        sx={{ mt: '0' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                px: { xs: '0', sm: '2rem' },
                                py: '5rem',
                                mx: 'auto',
                            }}>
                            <BasicImageComponent
                                src={pageContent.heroBook.imageUrl}
                                alt="Book cover"
                                priority
                                sizes="350px"
                                sx={{
                                    width: '325px',
                                    aspectRatio: '0.67',
                                    // height: 'calc(325px / 0.67)',
                                    mx: { xs: 'auto' },
                                    borderRadius: '.4rem',
                                }}
                            />
                            {/* <Box
                                sx={{
                                    contain: 'content',
                                    flexShrink: 0,
                                    borderRadius: '.4rem',
                                    width: '325px',
                                    aspectRatio: '0.67',
                                    // height: 'calc(325px / 0.67)',
                                    mx: { xs: 'auto' },
                                }}>
                                <Image
                                    src={pageContent.heroBook.imageUrl}
                                    alt="Book cover"
                                    priority={true}
                                    fill
                                    sizes="350px"
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box> */}

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
            </Container>
            <InnerPageContainer
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 0 },
                    pb: '40px',
                }}>
                {/* {console.log(posts, articles)} */}

                {props.children}
            </InnerPageContainer>
        </Container>
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

// function useResource(name) {
//     const [resourceList, setResource] = useState(null);

//     useEffect(() => {
//         async function fetchItems() {
//             const allItems = await getList(name);
//             // console.log(allItems);
//             // const sortedItems = allItems
//             //     .slice()
//             //     .sort(
//             //         (a, b) =>
//             //             new Date(b.datePublished) - new Date(a.datePublished)
//             //     )
//             //     .slice(0, 4);
//             setResource(allItems);
//         }
//         fetchItems();
//     }, []);

//     return resourceList;
// }

//
// const galleryContainerSX = {
//     display: 'flex',
//     gap: '1.5rem',
//     flexWrap: 'wrap',
//     border: '1px solid primary.main',
//     borderRadius: '.4rem',
//     padding: '2rem',
// };

// function getAndSortResourceByDate(resourceName, returnMaxResults) {
//     const resourceList = useResource(resourceName);
//     if (resourceList) {
//         const sortedResourceList = resourceList
//             .sort(
//                 (a, b) =>
//                     new Date(b.datePublished) - new Date(a.datePublished)
//             )
//             .slice(0, returnMaxResults);
//         return sortedResourceList;
//     }
// }

// const posts = getAndSortResourceByDate('posts', 4);
// const articles = getAndSortResourceByDate('articles', 4);

// const posts = props.posts ? props.posts : null;
// const articles = props.articles ? props.articles : null;
//

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
