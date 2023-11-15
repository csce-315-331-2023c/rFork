export const metadata = {
  title: 'Crepes',
  description: 'Crepe Restaurant GUI',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
          ></script>

        <script>var Alert = ReactBootstrap.Alert;</script>
      </head>
      <body>{children}</body>
    </html>
  )
}
