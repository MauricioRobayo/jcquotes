import "@/src/styles/globals.css";
import { ReactNode } from "react";
import { Nunito_Sans, Crimson_Pro } from "next/font/google";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { twJoin } from "tailwind-merge";
import Providers from "@/src/app/providers";

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
      <body>
        <Providers>
          ˝
          <div
            className={twJoin(
              nunitoSans.variable,
              crimsonProp.variable,
              "font-sans flex flex-col h-screen justify-between"
            )}
          >
            <div>
              <Header />
              <main className="flex justify-center">{children}</main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
