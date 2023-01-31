import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to LGP Formers</h1>
        <button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </main>
    </>
  );
};

export default Home;
