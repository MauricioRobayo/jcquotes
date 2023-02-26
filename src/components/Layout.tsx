import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Status } from "./Status";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen justify-between">
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
        <aside className="max-w-sm w-full mx-auto my-4">
          <Status />
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
