import { Nunito } from "next/font/google";

import "./globals.css";
import { Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import ToasterProvider from "./Providers/ToasterProvider";
import { getCurrentUser } from "./actions/getCurrentUser";

import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";

export const metadata = {
  title: "AirbNext",
  description: "Airbnb clone built with Next.js",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Suspense fallback={<>Loading...</>}>
          <SearchModal />
        </Suspense>
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
