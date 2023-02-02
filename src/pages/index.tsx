import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to LGP Formers</h1>
        {<h2 className="text-2xl">Hello {data?.user?.name}</h2>}
      </main>
    </>
  );
};

export default Home;
