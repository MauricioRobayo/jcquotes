import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
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
    </>
  );
};

export default Layout;
