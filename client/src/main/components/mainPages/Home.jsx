'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Container,
    Box,
    Paper,
    Stack,
    Typography,
    Link as MuiLink,
    Button,
} from '@mui/material';
// import { alpha, styled } from '@mui/material/styles';
// import { shadows } from '@mui/system';
import InnerPageContainer from '../InnerPageContainer';
import { getList } from '../../api/getResourceItems';
import ResourceGalleryCard from '../cards/ResourceGalleryCard';

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

function ResourcesGalleryContainer(props) {
    const sideScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, speed);
    };

    const ref = useRef(null);
    const scrollButtonWidth = { xs: 'calc(35px + 8vw)', sm: '30px' };

    const ScrollButton = props => (
        <Button
            onClick={() => {
                sideScroll(ref.current, 10, 360, props.scrollStep);
            }}
            sx={{
                height: '100%',
                width: scrollButtonWidth,
                position: 'absolute',
                justifyContent: props.justify,
                [props.direction]: 0,
                zIndex: 2,
            }}>
            {props.children}
        </Button>
    );

    const ScrollSpacer = () => (
        <Box
            sx={{
                flexShrink: 0,
                width: {
                    xs: `calc(${scrollButtonWidth.xs} - 15px)`,
                    sm: `calc(${scrollButtonWidth.sm} + 20px)`,
                },
            }}
        />
    );

    return (
        <Box>
            <Typography
                variant="h4"
                component="p"
                mt={'2.5rem'}
                mb={'1rem'}
                sx={{ px: { xs: '1rem', sm: 0 } }}>
                {props.title}
            </Typography>
            <Paper
                classNames="gallery-container"
                variant="outlined"
                sx={{
                    display: 'flex',
                    borderWidth: '2px',
                    borderRadius: '.4rem',
                    backgroundColor: 'greyAlpha.main',
                    width: { xs: '108%', sm: 'inherit' },
                    ml: { xs: '-4%', sm: 'inherit' },
                    position: 'relative',
                }}>
                <Box
                    ref={ref}
                    sx={{
                        // display: 'flex',
                        // height: '100%',
                        width: '100%',
                        py: '2rem',
                        overflowX: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: '1.5rem',
                            width: '100%',
                            height: '100%',
                            px: '.5rem',
                            // mx: { xs: '13%', sm: 'calc(45px + 3vw)' },
                        }}>
                        <ScrollSpacer />
                        {props.children}
                        <ScrollSpacer />
                    </Box>
                </Box>
                <ScrollButton
                    direction={'left'}
                    justify={'flex-end'}
                    scrollStep={-25}>
                    Left
                </ScrollButton>
                <ScrollButton
                    direction={'right'}
                    justify={'flex-start'}
                    scrollStep={25}>
                    Right
                </ScrollButton>
            </Paper>
        </Box>
    );
}

function Home(props) {
    const headerImageMask = {
        xs: 'linear-gradient(to top, black, black, rgba(0, 0, 0, 0.7), transparent, transparent)',
        md: 'linear-gradient(to left, black, black, rgba(0, 0, 0, 0.7), transparent, 85%, transparent)',
    };

    const galleryContainerSX = {
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        border: '1px solid primary.main',
        borderRadius: '.4rem',
        padding: '2rem',
    };

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

    const posts = props.posts;
    const articles = props.articles;

    //TODO: fetch hero book via id (?)
    //[x] TODO: fetch articles and filter for only most recent
    //[x] TODO: fetch posts and filter for only most recent

    return (
        <Container
            className="main"
            sx={{ mb: '1rem', mt: '0' }}
            maxWidth={'xl'}
            disableGutters>
            <Container
                className="headline"
                sx={{
                    display: 'grid',
                    gridTemplateRows: 'minmax(500px, 70vh)',
                    gridTemplateColumns: '1fr',
                    // justifyContent: 'center',
                    alignItems: 'start',
                    mt: '0',
                    // p: '1rem',
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
                        My Headline Message Here.{' '}
                        <Typography
                            variant="h2"
                            component="span"
                            color="primary.dark">
                            {' '}
                            This is what I'm all about.
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
                        className="home-header-image"
                        src="https://picsum.photos/700/600?random=1"
                        alt="A random image"
                        fill
                        priority
                    />
                    {/* <Box
                        component="img"
                        src="https://picsum.photos/700/600?random=1"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    /> */}
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
                                flexDirection: { xs: 'column', sm: 'row' },
                                p: '2rem',
                                py: '5rem',
                                mx: 'auto',
                            }}>
                            <Box
                                component="img"
                                src="https://picsum.photos/400/500?random=2"
                                className="hero book-cover"
                                sx={{
                                    borderRadius: '.4rem',
                                    width: '325px',
                                    height: '400',
                                    objectFit: 'fill',
                                    mx: { xs: 'auto' },
                                }}
                            />
                            <Stack
                                gap={2}
                                className="hero content"
                                sx={{
                                    flexGrow: 1,
                                    ml: { xs: 0, sm: '3rem' },
                                    mt: { xs: '2.5rem', sm: 0 },
                                }}>
                                <Typography
                                    variant="h3"
                                    component="p"
                                    color={'lightgold.main'}
                                    textAlign={'center'}>
                                    Book Title
                                </Typography>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vivamus pharetra nisl
                                    risus, in volutpat leo viverra vel.
                                    Suspendisse ac posuere ex. Integer nunc
                                    nisl, lobortis id ultrices euismod, pulvinar
                                    in erat. Sed pharetra convallis massa
                                    consectetur ullamcorper. Nulla lacinia
                                    ultricies nibh, vel hendrerit dolor. Aenean
                                    convallis nisi id arcu facilisis ultricies.
                                    Integer sed nisi eget nunc elementum egestas
                                    et eu lorem. Mauris mollis tortor id
                                    eleifend dapibus.
                                </Typography>
                                <Box mt={'2rem'}>
                                    <Stack
                                        gap={4}
                                        sx={{ width: '200px', mx: 'auto' }}>
                                        <Button
                                            component={Link}
                                            href="/"
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
                    pb: '30px',
                }}>
                {/* {console.log(posts, articles)} */}
                {articles && (
                    <ResourcesGalleryContainer title="Recent Articles">
                        {articles.length > 0 &&
                            articles.map(article => (
                                <ResourceGalleryCard
                                    key={article._id}
                                    resource="article"
                                    title={article.title}
                                    image={article.image.url}
                                    imageAlt={article.image.altText}
                                    published={article.datePublished}
                                    publisher={article.publisher.name}
                                    // created={props.article.createdAt}
                                    mainLinkTo={
                                        article.url
                                            ? article.url
                                            : `/published/articles/id/${article._id}`
                                    }
                                    mainLinkIsLocal={article.url ? false : true}
                                    mainLinkLabel={
                                        article.url &&
                                        `Read this article on the ${article.publisher.name} website, which opens in a new tab.`
                                    }
                                    // actions={''}
                                />
                            ))}
                    </ResourcesGalleryContainer>
                )}
                {posts && (
                    <ResourcesGalleryContainer title="Recent Posts">
                        {posts.length > 0 &&
                            posts.map(post => (
                                <ResourceGalleryCard
                                    key={post._id}
                                    resource="post"
                                    title={post.title}
                                    image={
                                        post.image && post.image.url
                                            ? post.image.url
                                            : null
                                    }
                                    imageAlt={
                                        post.image && post.image.altText
                                            ? post.image.altText
                                            : null
                                    }
                                    published={post.datePublished}
                                    created={post.createdAt}
                                    mainLinkIsLocal={true}
                                    mainLinkTo={`/published/posts/id/${post._id}`}
                                    mainLinkLabel="Read full post"
                                    // actions={
                                    //     <Button
                                    //         component={Link}
                                    //         href={`/published/posts/id/${props.post._id}`}
                                    //         className="link">
                                    //         ➣ Read full post
                                    //     </Button>}
                                />
                            ))}
                    </ResourcesGalleryContainer>
                )}
            </InnerPageContainer>
        </Container>
    );
}

export default Home;
