import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { api } from "../utils/api";
import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";

const Home: NextPage = () => {
  const session = useSession();

  const [showDialog, setShowDialog] = useState({
    student: false,
    teacher: false,
  });
  const [studentInput, setStudentInput] = useState({
    startedInYear: new Date().getFullYear() - 1,
    leftInYear: new Date().getFullYear(),
    graduated: false,
    schoolSearchInput: "",
    selectedSchoolId: "",
  });

  // const createStudentMutation = api.student.createStudent.useMutation({
  //   onSuccess: () => {
  //     void user.refetch();
  //   },
  // });

  // const user = api.user.findUser.useQuery({
  //   userId: session.data?.user?.id || "",
  // });

  const schools = api.school.list.useQuery();

  // const addToSchoolAsStudent = () => {
  //   createStudentMutation.mutate({
  //     yearOfGraduation: studentInput.yearOfGraduation,
  //     userId: session.data?.user?.id || "",
  //     schoolId: user.data?.School.id || "",
  //   });
  // };

  // const addToSchoolAsTeacher = () => {
  //   console.log("Add to school as teacher");
  // };

  return (
    <>
      <Head>
        <title>LGP Formers</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-100 flex min-h-screen flex-col p-4">
        <div className="h-4"></div>
        <h1 className=" mb-4 text-center text-4xl font-bold">
          Add a new entry
        </h1>
        <p className="mb-2 text-center text-xl font-medium">I was a ...</p>
        <div className="flex justify-center gap-16 p-4">
          <Button
            label="Student"
            onClick={() => setShowDialog({ teacher: false, student: true })}
          ></Button>
          <Button
            label="Teacher"
            onClick={() => setShowDialog({ teacher: true, student: false })}
          ></Button>
        </div>
        {showDialog.student && (
          <div className="flex flex-col gap-4 p-4">
            <p className="text-xl font-medium">I studied at</p>
            <Input
              label="School Name or location"
              type="text"
              value={studentInput.schoolSearchInput}
              onChange={(e) =>
                setStudentInput({
                  ...studentInput,
                  schoolSearchInput: e.target.value,
                })
              }
            />
            <div>
              {schools.data
                ?.filter(
                  (school) =>
                    school.name
                      .toLowerCase()
                      .includes(studentInput.schoolSearchInput.toLowerCase()) ||
                    school.location
                      .toLowerCase()
                      .includes(studentInput.schoolSearchInput.toLowerCase())
                )
                .slice(0, 5)
                .map((school) => (
                  <div
                    key={school.id}
                    onClick={() =>
                      setStudentInput({
                        ...studentInput,
                        selectedSchoolId: school.id,
                      })
                    }
                  >
                    {school.name}
                  </div>
                ))}
            </div>

            <p className="text-xl font-medium">I started studying in</p>
            <Input
              label="Start Year"
              type="number"
              value={studentInput.startedInYear}
              onChange={(e) =>
                setStudentInput({
                  ...studentInput,
                  startedInYear: parseInt(e.target.value),
                })
              }
            />

            <p className="text-xl font-medium">I left studying in</p>
            <Input
              label="End Year"
              type="number"
              value={studentInput.leftInYear}
              onChange={(e) =>
                setStudentInput({
                  ...studentInput,
                  leftInYear: parseInt(e.target.value),
                })
              }
            />

            <p className="text-xl font-medium">Did you graduate?</p>
            <div className="mb-4 flex items-center">
              <input
                id="graduated"
                type="checkbox"
                checked={studentInput.graduated}
                onChange={(e) =>
                  setStudentInput({
                    ...studentInput,
                    graduated: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Default checkbox
              </label>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
