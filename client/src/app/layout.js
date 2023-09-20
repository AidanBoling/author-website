export const metadata = {
    title: 'Author Website',
    description: 'My App is a...',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
