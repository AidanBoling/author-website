'use client';

import dynamic from 'next/dynamic';

import '@/main/styles/styles.css';

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
