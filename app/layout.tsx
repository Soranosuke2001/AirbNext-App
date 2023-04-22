import { Nunito } from 'next/font/google';

import './globals.css'
import Navbar from './components/Navbar/Navbar';
import Modal from './components/Modals/Modal';
import RegisterModal from './components/Modals/RegisterModal';

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
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
