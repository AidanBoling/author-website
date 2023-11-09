'use client';
import PeriodicalsHeading from '@/main/components/layout/PeriodicalsHeading';
import PeriodicalsBody from '../layout/PeriodicalsBody';
import { Box, Typography, Link } from '@mui/material';
import NorthEastSharpIcon from '@mui/icons-material/NorthEastSharp';

function ArticlePage({ article }) {
    return (
        <>
            {article && (
                <>
                    {/* {console.log(article)} */}
                    <PeriodicalsHeading
                        title={article.title}
                        published={article.datePublished}
                    />
                    <PeriodicalsBody
                        periodical={article}
                        content={article.content}
                        contentFallback={article.descriptionShort}>
                        {article.publisher.name && (
                            <Box
                                className="article details"
                                sx={{ mt: '4rem' }}>
                                {/* TODO: - Make sure links open in new tab */}
                                <Typography>
                                    Publisher:{' '}
                                    <Link
                                        href={article.publisher.website}
                                        target="_blank"
                                        aria-label={`Link to publisher's website, which opens in a new tab`}
                                        underline="none"
                                        sx={{
                                            ':hover': { color: 'primary.dark' },
                                        }}>
                                        {article.publisher.name}{' '}
                                        <NorthEastSharpIcon
                                            fontSize="xsmall"
                                            sx={{
                                                color: 'primary.dark',
                                            }}
                                        />
                                    </Link>
                                </Typography>
                                <Typography>
                                    <Link
                                        href={article.url}
                                        target="_blank"
                                        aria-label={`Link to article on publisher's website, which opens in a new tab`}
                                        sx={{
                                            ':hover': { color: 'primary.dark' },
                                        }}>
                                        See article in external site
                                        <NorthEastSharpIcon
                                            fontSize="xsmall"
                                            sx={{
                                                ml: '.3rem',
                                                color: 'primary.dark',
                                            }}
                                        />
                                    </Link>
                                </Typography>
                            </Box>
                        )}
                    </PeriodicalsBody>
                </>
            )}
        </>
    );
}

export default ArticlePage;

//
//
// TEMP Archive ------------------
//

// const params = useParams();
// console.log('Id: ', params.id);

// const [article, setArticle] = useState('');

// useEffect(() => {
//     async function fetchItem() {
//         console.log('Fetching item...');
//         const foundItem = await getById(params.id, 'articles');
//         // console.log(foundItem);
//         setArticle(foundItem);
//     }
//     fetchItem();
// }, []);

//

// {/* <Box className="article-header fullpage header">
//     <h1>{article.title}</h1>
//     <p>
//         Published{' '}
//         {new Date(article.datePublished).toLocaleDateString(
//             'en-us',
//             {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//             }
//         )}
//     </p>
// </Box> */}

//
//

//     {/* <div className="article-cover fullpage image">
//     <img
//         src={article.image.url}
//         alt={article.image.altText}></img>
// </div>
// <div className="book-content">
//     {article.content ? (
//         <div
//             dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(article.content),
//             }}
//         />
//     ) : (
//         article.descriptionShort
//     )}
// </div> */}
