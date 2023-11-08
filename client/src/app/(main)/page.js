import Home from '@/main/components/mainPages/Home';
import { preloadGetList } from '@/main/api/getResourceItems';

import { Suspense } from 'react';
import PostsCards from '@/main/components/lists/PostsCardsList';
import ResourcesGalleryContainer from '@/main/components/HomeResourcesGalleryContainer';
import ArticlesCards from '@/main/components/lists/ArticlesCardsList';

export default async function Page() {
    const params = { limit: 5 };

    preloadGetList('articles', params);
    preloadGetList('posts', params);

    return (
        <Home listParams={params}>
            <ResourcesGalleryContainer
                title="Recent Articles"
                mainPage={'/published/articles'}>
                <Suspense fallback={<p>Loading...</p>}>
                    <ArticlesCards listParams={params} />
                </Suspense>
            </ResourcesGalleryContainer>
            <ResourcesGalleryContainer
                title="Recent Posts"
                mainPage={'/published/posts'}>
                <Suspense fallback={<p>Loading...</p>}>
                    <PostsCards listParams={params} />
                </Suspense>
            </ResourcesGalleryContainer>
        </Home>
    );
}

//
// TEMP archive ---------------------

// function sortResourceByDate(resource, returnMaxResults) {
//     const sortedResourceList = resource
//         .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
//         .slice(0, returnMaxResults);
//     return sortedResourceList;
// }

// async function getAndSortResource(resourceName, number) {
//     const resourceList = await getList(resourceName);
//     if (resourceList) {
//         return resourceList.items.slice(0, number);
//         // const sortedResource = sortResourceByDate(resourceList, number);
//         // return sortedResource;
//     }
// }
// import { getListCache } from '@/main/api/getResourceItems';

//
// Previous way (no preload pattern):
// const articles = await getList('articles', params);
// const posts = await getList('posts', params);

// TODO: Delete:
// const articles = await getAndSortResource('articles', 4);
// const posts = await getAndSortResource('posts', 4);
