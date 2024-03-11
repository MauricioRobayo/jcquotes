import Footer from "@/src/components/Footer";
import NextTopLoader from "nextjs-toploader";
import Header from "@/src/components/Header";
import "@/src/styles/globals.css";
import { Crimson_Pro, Nunito_Sans } from "next/font/google";
import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "700"],
});

const crimsonProp = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  weight: ["300"],
});

export const metadata = {
  title: "James Clear Quotes",
  description: "James Clear Quotes from 1-2-3 newsletter",
  icons: "/favicon.ico",
};

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={twJoin(
          nunitoSans.variable,
          crimsonProp.variable,
          "text-gold-2 dark:text-gold-0 dark:bg-gold-4 font-sans flex flex-col h-screen justify-between"
        )}
      >
        <NextTopLoader color="#5e5b55" />
        <div className="grow px-4">
          <Header />
          <main className="flex justify-center">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
