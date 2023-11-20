'use client';

export default function GlobalError({ error, reset }) {
    console.log('There was an error! Error: ', error);
    return (
        <html>
            <body>
                <h1>Something went wrong!</h1>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    );
}
