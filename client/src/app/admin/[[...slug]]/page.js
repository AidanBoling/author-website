'use client';

import dynamic from 'next/dynamic';

import '../../../main/css/styles.css';

// const App = dynamic(() => import('../../main/components/App'), { ssr: false });
const AdminApp = dynamic(() => import('../../../site_admin/components/App'), {
    ssr: false,
});

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }

export default function Page() {
    return <AdminApp />;
}
