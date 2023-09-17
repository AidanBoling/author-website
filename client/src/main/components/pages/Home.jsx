import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Stack, Typography, Link, Button } from '@mui/material';
import PageTitle from '../PageTitle';
import InnerPageContainer from '../InnerPageContainer';

function Home() {
    //TODO: fetch hero book via id
    //TODO: fetch articles and filter for only most recent
    //TODO: fetch posts and filter for only most recent

    return (
        <Container
            className="main"
            sx={{ my: '1rem' }}
            maxWidth={'xl'}
            disableGutters>
            <PageTitle title="Home" />
            <InnerPageContainer
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '800px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: '1rem',
                }}>
                <Typography variant="h3" component="p" textAlign={'center'}>
                    My Headline Message Here. This is what I'm all about.
                </Typography>

                <Box
                    component="img"
                    src="https://picsum.photos/800/400?random=1"
                    sx={{ mx: 'auto', height: '100%' }}
                />
            </InnerPageContainer>

            <Container
                className="hero bg"
                sx={{
                    backgroundColor: 'forestgreen.main',
                }}
                maxWidth={'xl'}>
                <Container className="hero content-container">
                    <Box sx={{ display: 'flex', p: '2rem', py: '3rem' }}>
                        <Box
                            component="img"
                            src="https://picsum.photos/300/400?random=2"
                            className="hero book-cover"
                            sx={{
                                borderRadius: '.4rem',
                                width: '225px',
                                height: '300',
                                objectFit: 'fill',
                            }}
                        />
                        <Stack
                            gap={2}
                            className="hero content"
                            sx={{ flexGrow: 1, ml: '2rem' }}>
                            <Typography variant="h4">Book Title</Typography>
                            <Typography>
                                This book is a lorem ipsum dolor...
                            </Typography>
                            <Link component={RouterLink} to="/">
                                Click to read more
                            </Link>
                            <Box>
                                <Button variant="contained">Buy Now!</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Container>
            <InnerPageContainer sx={{ mx: '1rem' }}>
                <Box className="recent-articles gallery container">
                    {/* <ResourceCard
                        resource="article"
                        title={props.article.title}
                        image={props.article.image.url}
                        imageAlt={props.article.image.altText}
                        published={props.article.datePublished}
                        publisher={props.article.publisher.name}
                        // created={props.article.createdAt}
                        mainLinkTo={
                            props.article.url
                                ? props.article.url
                                : `/published/articles/id/${props.article._id}`
                        }
                        mainLinkIsLocal={props.article.url ? false : true}
                        mainLinkLabel={
                            props.article.url &&
                            `Read this article on the ${props.article.publisher.name} website, which opens in a new tab.`
                        }
                        // actions={''}
                    /> */}
                </Box>
                <Box className="home-posts preview"></Box>
            </InnerPageContainer>
        </Container>
    );
}

export default Home;
