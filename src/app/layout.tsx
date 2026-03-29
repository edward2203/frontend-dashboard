export const metadata = {
  title: 'Monitor Euclidiano',
  description: 'Panel de control de analíticas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, background: '#111' }}>
        {children}
      </body>
    </html>
  )
}