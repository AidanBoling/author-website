import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function ArticleCard(props) {
    console.log('Received article: ', props.article);
    // console.log(props.post._id);

    return (
        <ResourceCard
            title={props.article.title}
            hasMedia
            image={props.article.image.url}
            imageAlt={props.article.image.altText}
            published={props.article.datePublished}
            created={props.article.createdAt}
            content={props.article.descriptionShort}
            actions={
                props.article.content ? (
                    <Link
                        to={`/published/articles/id/${props.article._id}`}
                        className="link">
                        <Button>➣ Read article</Button>
                    </Link>
                ) : (
                    <a href={props.article.url} className="link">
                        <Button>
                            ➣ Read article on {props.article.publisher.name}
                        </Button>
                    </a>
                )
            }
        />
    );
}

export default ArticleCard;
