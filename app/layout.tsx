import { Nunito } from 'next/font/google';

import './globals.css'
import Navbar from './components/Navbar/Navbar';
import Modal from './components/Modals/Modal';

export const metadata = {
  title: 'Airbnext',
  description: 'Airbnb clone built with Next.js',
}

const font = Nunito({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal isOpen title='Login' />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
