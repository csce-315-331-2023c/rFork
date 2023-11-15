export const metadata = {
  title: 'Crepes',
  description: 'Crepe Restaurant GUI',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
