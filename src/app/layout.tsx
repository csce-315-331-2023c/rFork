export const metadata = {
  title: 'Crepes',
  description: 'Crepe Restaurant GUI',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
