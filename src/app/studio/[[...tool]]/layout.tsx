export const metadata = {
  title: 'DENTCRAFT Studio',
  description: 'Content Management System for DENTCRAFT',
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
