import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const schools = api.school.list.useQuery();
  const createSchoolMutation = api.school.createSchool.useMutation({
    onSuccess: () => {
      console.log("School created");
      void schools.refetch();
    },
  });
  const deleteSchoolMutation = api.school.deleteSchool.useMutation({
    onSuccess: () => {
      console.log("School deleted");
      void schools.refetch();
    },
  });

  const addTestSchool = () => {
    createSchoolMutation.mutate({
      name: "Test School",
      location: "Test Address",
    });
  };

  const deleteSchool = (id: string) => {
    deleteSchoolMutation.mutate({
      id,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <button onClick={() => addTestSchool()}>Add Test School</button>
      {schools.data?.map((school) => (
        <>
          <p key={school.id}>{school.name}</p>
          <button onClick={() => deleteSchool(school.id)}>Delete Entry</button>
        </>
      ))}
    </div>
  );
};
