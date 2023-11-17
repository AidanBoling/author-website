'use client';
import Link from 'next/link';
import { Link as MuiLink, Typography } from '@mui/material';
import ResourceCard from './ResourceCard';

function ArticleCard({ article }) {
    // console.log('Received article: ', article);

    const image =
        article.image && article.image.fromDB
            ? article.image.fromDB
            : article.image;

    const summaryContent = article.content ? (
        <>
            <Typography>{article.descriptionShort}</Typography>
            <Typography mt={'1rem'}>
                This article also available to{' '}
                <MuiLink
                    component={Link}
                    href={`/published/articles/id/${article._id}`}
                    className="link">
                    read through this site
                </MuiLink>
                .
            </Typography>
        </>
    ) : (
        <Typography>{article.descriptionShort}</Typography>
    );

    return (
        <ResourceCard
            resource="article"
            title={article.title}
            image={image && image.url}
            imageAlt={image && image.altText}
            published={article.datePublished}
            publisher={article.publisher && article.publisher.name}
            created={article.createdAt}
            content={summaryContent}
            mainLinkTo={
                (article.url && article.url) ||
                `/published/articles/id/${article._id}`
            }
            mainLinkIsLocal={article.url ? false : true}
            mainLinkLabel={
                article.url &&
                `Read this article on the ${
                    article.publisher && article.publisher.name
                } website, which opens in a new tab.`
            }
            actions={''}
        />
    );
}

export default ArticleCard;
