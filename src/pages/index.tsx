import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to LGP Formers</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center">
            {session.data && (
              <div>
                <span>Logged in as {session.data.user?.name}</span>
                <span>
                  {Object.values(session.data.user || {}).map((value) => (
                    <p key={value}>
                      {value}
                      <br />
                    </p>
                  ))}
                </span>
              </div>
            )}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
