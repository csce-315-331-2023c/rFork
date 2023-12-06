import React from 'react';
import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <html lang="en">
            <body>
                <div style={{ fontFamily: 'Arial, sans-serif', display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h1>Unauthorized</h1>
                    <p>You are not authorized to view this page.</p>
                    <p><Link href="/" aria-label="Home">Home</Link></p>
                </div>
            </body>
        </html>
    )
}