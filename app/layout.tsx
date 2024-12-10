import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Walias.io - The Future of Digital Identity',
  description: 'Join the waitlist for the next generation of digital identity management.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#f6f6f6]">{children}</body>
    </html>
  )
}

