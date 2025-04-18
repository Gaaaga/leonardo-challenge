import type { Metadata } from 'next'
import Providers from './providers'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Leonardo Challenge',
  description: 'Frontend challenge using Next.js, Chakra UI, Apollo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
