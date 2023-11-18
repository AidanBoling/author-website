import RootStyleRegistry from './RootStyleRegistry.js';

export const metadata = {
    title: 'Author Website',
    description: '',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <div id="root">
                    <RootStyleRegistry>{children}</RootStyleRegistry>
                </div>
            </body>
        </html>
    );
}
