import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardMedia, Button, Link, Typography } from '@mui/material';
import ResourceCard from './ResourceCard';

function ArticleCard(props) {
    console.log('Received article: ', props.article);
    // console.log(props.post._id);

    const summaryContent = props.article.content ? (
        <>
            <Typography>{props.article.descriptionShort}</Typography>
            <Typography mt={'1rem'}>
                This article also available to{' '}
                <Link
                    component={RouterLink}
                    to={`/published/articles/id/${props.article._id}`}
                    className="link">
                    read through this site
                </Link>
                .
            </Typography>
        </>
    ) : (
        <Typography>{props.article.descriptionShort}</Typography>
    );

    return (
        <ResourceCard
            resource="article"
            title={props.article.title}
            image={props.article.image.url}
            imageAlt={props.article.image.altText}
            published={props.article.datePublished}
            publisher={props.article.publisher.name}
            created={props.article.createdAt}
            content={summaryContent}
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
            actions={''}
        />
    );
}

export default ArticleCard;
