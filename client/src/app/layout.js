import RootStyleRegistry from './RootStyleRegistry.js';
import pageContent from '@/main/content/siteContent.json';
import { Alex_Brush } from 'next/font/google';

export const metadata = {
    title: pageContent.metadata.title,
    description: pageContent.metadata.description,
};

const alex_brush = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-alex-brush',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${alex_brush.variable}`}>
            <head></head>
            <body>
                <div id="root">
                    <RootStyleRegistry>{children}</RootStyleRegistry>
                </div>
            </body>
        </html>
    );
}
