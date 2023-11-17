'use client';
// import React from 'react';
import Link from 'next/link';
import { Link as MuiLink, Typography } from '@mui/material';
import ResourceCard from './ResourceCard';

function ArticleCard(props) {
    // console.log('Received article: ', props.article);
    // console.log(props.post._id);
    const image = props.article.image?.fromDB
        ? props.article.image.fromDB
        : props.article.image;

    const summaryContent = props.article.content ? (
        <>
            <Typography>{props.article.descriptionShort}</Typography>
            <Typography mt={'1rem'}>
                This article also available to{' '}
                <MuiLink
                    component={Link}
                    href={`/published/articles/id/${props.article._id}`}
                    className="link">
                    read through this site
                </MuiLink>
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
            image={image.url}
            imageAlt={image.altText}
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
