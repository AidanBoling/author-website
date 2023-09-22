'use client';
import dynamic from 'next/dynamic';
import '@/admin/styles/styles.css';

const AdminApp = dynamic(() => import('../../../site_admin/components/App'), {
    ssr: false,
});

export default function Page() {
    return <AdminApp />;
}
