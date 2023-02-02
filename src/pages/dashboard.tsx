import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Dashboard: NextPage = () => {
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
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            onClick={session.data ? () => void signOut() : () => void signIn()}
          >
            {session.data ? "Sign out" : "Sign in"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
