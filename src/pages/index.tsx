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
  const [schoolInput, setSchoolInput] = useState("");

  const createStudentMutation = api.student.createStudent.useMutation({
    onSuccess: () => {
      void user.refetch();
    },
  });

  const user = api.user.findUser.useQuery({
    userId: session.data?.user?.id || "",
  });

  const schools = api.school.list.useQuery();

  const addToSchoolAsStudent = () => {
    createStudentMutation.mutate({
      yearOfGraduation: studentInput.yearOfGraduation,
      userId: session.data?.user?.id || "",
      schoolId: user.data?.School?.id || "",
    });
  };

  const addToSchoolAsTeacher = () => {
    console.log("Add to school as teacher");
  };

  const mapSchoolToUserMutation = api.user.mapSchool.useMutation({
    onSuccess: () => {
      void user.refetch();
      void schools.refetch();
    },
  });
  const selectSchool = (id: string) => {
    mapSchoolToUserMutation.mutate({
      userId: session.data?.user?.id || "",
      schoolId: id,
    });
  };

  const removeSchoolFromUserMutation = api.user.removeSchool.useMutation({
    onSuccess: () => {
      void user.refetch();
      void schools.refetch();
    },
  });
  const removeSchoolFromCurrentUser = () => {
    removeSchoolFromUserMutation.mutate({
      userId: session.data?.user?.id || "",
    });
  };

  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-100 flex min-h-screen flex-col items-center p-4">
        <div className="h-4"></div>
        {user.data?.School ? (
          <>
            <p>You went to school at:</p>
            <div
              key={user.data.School.id}
              className="relative mb-2 w-96 border p-2 hover:cursor-pointer hover:bg-gray-100"
            >
              <p>
                {user.data.School.name}
                <br />
                <span className="text-gray-500">
                  {user.data.School.location}
                </span>
              </p>
            </div>
            <button onClick={removeSchoolFromCurrentUser}>Remove school</button>
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
            <p className="mb-4 text-xl font-medium">
              Let&apos;s find the school you went to.
            </p>

            {schools.data?.length ? (
              <div className="flex w-96 flex-col">
                <Input
                  label="Search school"
                  value={schoolInput}
                  onChange={(e) => setSchoolInput(e.target.value)}
                  placeholder="Search school by name or location"
                />
                {schools.data
                  .filter(
                    (school) =>
                      school.name
                        .toLowerCase()
                        .includes(schoolInput.toLowerCase()) ||
                      school.location
                        .toLowerCase()
                        .includes(schoolInput.toLowerCase())
                  )
                  .map((school) => (
                    <div
                      key={school.id}
                      className="relative mb-2 border p-2 hover:cursor-pointer hover:bg-gray-100"
                      onClick={() => selectSchool(school.id)}
                    >
                      <p>
                        {school.name}
                        <br />
                        <span className="text-gray-500">{school.location}</span>
                      </p>

                      <span className="absolute top-2 right-2 rounded border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-400">
                        {school.Student.length + school.Teacher.length} Members
                      </span>
                    </div>
                  ))}
              </div>
            ) : null}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
