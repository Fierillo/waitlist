import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Waitlist para el Bitcoin Pizza Day',
  description: '¡No te vayas a quedar afuera de este evento único!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="font-blatant min-h-screen bg-[#f6f6f6]">{children}</body>
    </html>
  )
}

