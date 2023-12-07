export const metadata = {
  title: 'Sweet Paris',
  description: 'Crepe Restaurant GUI',
}

/**
 * Root layout of fonts for the gui
 */
export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen" />
      </head>
      <body>{children}</body>
    </html>
  )
}
