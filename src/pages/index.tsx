import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>James Clear Quotes</title>
        <meta
          name="description"
          content="James Clear Quotes from 1-2-3 newsletter"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>James Clear Quotes</h1>
      </main>
    </div>
  );
};

export default Home;
