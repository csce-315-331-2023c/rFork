export const metadata = {
  title: 'Crepes',
  description: 'Crepe Restaurant GUI',
}

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
