'use client';
import PeriodicalsHeading from '@/main/components/layout/PeriodicalsHeading';
import PeriodicalsBody from '@/main/components/layout/PeriodicalsBody';
import PeriodicalsFooter from '@/main/components/layout/PeriodicalsFooter';

function PostPage({ post }) {
    let publishedDate = post.publishedDate
        ? post.publishedDate
        : post.createdAt;

    return (
        post && (
            <>
                <PeriodicalsHeading
                    title={post.title}
                    published={publishedDate}
                />
                <PeriodicalsBody
                    periodical={post}
                    // imageFloat="left"
                    content={post.content && post.content.richText}
                    // contentFallback={
                    //     post.content.plain &&
                    //     post.content.plain.length > 0 &&
                    //     post.content.plain.map((paragraph, index) => (
                    //         <p key={index + 1}>{paragraph}</p>
                    //     ))
                    // }
                />
                <PeriodicalsFooter />
            </>
        )
    );
}

export default PostPage;
