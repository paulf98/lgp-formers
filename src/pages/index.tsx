import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";

const Home: NextPage = () => {
  const session = useSession();
  const [studentInput, setStudentInput] = useState({
    yearOfGraduation: new Date().getFullYear(),
  });

  const createStudentMutation = api.student.createStudent.useMutation({
    onSuccess: () => {
      void user.refetch();
    },
  });

  const user = api.user.findUser.useQuery({
    userId: session.data?.user?.id || "",
  });
  console.log(user.data);

  const addToSchoolAsStudent = () => {
    console.log("Starting mutation");
    console.log(
      studentInput.yearOfGraduation,
      session.data?.user?.id,
      user.data?.School?.id
    );
    createStudentMutation.mutate({
      yearOfGraduation: studentInput.yearOfGraduation,
      userId: session.data?.user?.id || "",
      schoolId: user.data?.School?.id || "",
    });
  };

  const addToSchoolAsTeacher = () => {
    console.log("Add to school as teacher");
  };

  const selectSchool = () => {
    console.log("Select school");
  };

  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center p-4">
        <h1 className="text-4xl font-bold">Welcome to LGP Formers</h1>

        <div className="h-4"></div>
        {user.data?.School ? (
          <>
            <p>
              You went to school: {user.data.School.name},{" "}
              {user.data.School.location}
            </p>
            <div className="h-4"></div>

            {user.data?.Student ? (
              <p>
                You were there as a student and graduated in{" "}
                {user.data.Student.yearOfGraduation}
              </p>
            ) : (
              <>
                <p>Were you there as a student?</p>
                <Input
                  label="Year of graduation"
                  type="number"
                  value={studentInput.yearOfGraduation}
                  onChange={(e) =>
                    setStudentInput({
                      ...studentInput,
                      yearOfGraduation: parseInt(e.target.value),
                    })
                  }
                />
                <Button
                  label="Add me as a student"
                  onClick={addToSchoolAsStudent}
                />
              </>
            )}

            <div className="h-4"></div>

            {user.data?.Teacher ? (
              <p>Was there as a teacher {user.data.Teacher.id}</p>
            ) : (
              <>
                <p>Was not there as teacher.</p>
                <Button
                  label="Add me as a teacher"
                  onClick={addToSchoolAsTeacher}
                />
              </>
            )}
          </>
        ) : (
          <>
            <p>No school selected yet.</p>
            <Button label="Select a school" onClick={selectSchool} />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
