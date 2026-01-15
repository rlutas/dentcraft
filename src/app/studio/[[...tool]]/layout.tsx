export const metadata = {
  title: 'Dentcraft Studio',
  description: 'Content Management System for Dentcraft',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
