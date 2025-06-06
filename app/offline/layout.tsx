import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offline - Dr. Sarah Mitchell',
  description: 'You are currently offline. Some features may be limited.',
  robots: 'noindex',
}

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 