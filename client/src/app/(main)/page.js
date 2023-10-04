import Home from '@/main/components/mainPages/Home';
import { getList } from '@/main/api/getResourceItems';

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

export default async function Page() {
    const params = { limit: 5 };
    const articles = await getList('articles', params);
    const posts = await getList('posts', params);
    // const articles = await getAndSortResource('articles', 4);
    // const posts = await getAndSortResource('posts', 4);

    return <Home posts={posts.items} articles={articles.items} />;
}
