import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Nunito_Sans } from "next/font/google";
import cn from "clsx";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "700"],
});

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={cn(
        nunitoSans.variable,
        "font-sans flex flex-col h-screen justify-between"
      )}
    >
      <div>
        <Head>
          <title>James Clear Quotes</title>
          <meta
            name="description"
            content="James Clear Quotes from 1-2-3 newsletter"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="flex justify-center">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
