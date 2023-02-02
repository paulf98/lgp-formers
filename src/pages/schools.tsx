import type { NextPage } from "next";
import { useState } from "react";
import Button from "../components/Button";
import { api } from "../utils/api";

const Schools: NextPage = () => {
  const [school, setSchool] = useState({
    name: "",
    location: "",
  });

  const schools = api.school.list.useQuery();
  const createSchoolMutation = api.school.createSchool.useMutation({
    onSuccess: () => {
      void schools.refetch();
    },
  });
  const deleteSchoolMutation = api.school.deleteSchool.useMutation({
    onSuccess: () => {
      void schools.refetch();
    },
  });

  const deleteSchool = (id: string) => {
    deleteSchoolMutation.mutate({
      id,
    });
  };

  const addNewSchool = () => {
    createSchoolMutation.mutate(school);
  };

  return (
    <div>
      <div className="mx-auto my-8 flex max-w-sm flex-col gap-2">
        <h1 className="mb-2 text-2xl font-bold">Add new School</h1>
        <input
          type="text"
          name="name"
          id="name"
          value={school.name}
          onChange={(e) => setSchool({ ...school, name: e.target.value })}
        />
        <input
          type="text"
          name="location"
          id="location"
          value={school.location}
          onChange={(e) => setSchool({ ...school, location: e.target.value })}
        />
        <Button label="Submit" onClick={addNewSchool} />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                School name
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {schools.data?.map((school) => (
              <tr
                key={school.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {school.name}
                </th>
                <td className="px-6 py-4">{school.location}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteSchool(school.id)}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schools;
