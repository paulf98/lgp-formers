import { User } from "lucide-react";
import type { NextPage } from "next";
import Image from "next/image";
import { api } from "../utils/api";

const Users: NextPage = () => {
  const { data: userData } = api.user.listUsers.useQuery();

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Teacher
              </th>
              <th scope="col" className="px-6 py-3">
                Student
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user) => (
              <tr
                key={user.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
                >
                  {user.image ? (
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={user.image}
                      width={40}
                      height={40}
                      alt={`Image of ${user.name || "a user"}`}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white">
                      <User size={30} />
                    </div>
                  )}
                  <div className="pl-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {user.Teacher.length > 0 || "No Teacher"}
                </td>
                <td className="px-6 py-4">
                  {user.Student.length > 0 ? user.Student.length : "No Student"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
