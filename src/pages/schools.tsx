import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";

const Schools: NextPage = () => {
  const session = useSession();

  const [school, setSchool] = useState({
    name: "",
    location: "",
  });

  const user = api.user.findUser.useQuery({
    userId: session.data?.user?.id || "",
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

  const addSchoolToUserMutation = api.user.addSchool.useMutation({
    onSuccess: () => {
      void schools.refetch();
    },
  });

  const deleteSchool = (id: string) => {
    deleteSchoolMutation.mutate({
      id,
    });
  };

  const addSchoolToUser = () => {
    addSchoolToUserMutation.mutate({
      userId: user.data?.id || "",
      schoolId: schools?.data?.[0]?.id || "",
    });
  };

  const addNewSchool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createSchoolMutation.mutate(school);
  };

  return (
    <div>
      <form onSubmit={addNewSchool}>
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
        <input type="submit" value="Submit" />
      </form>
      {schools.data?.map((school) => (
        <div key={school.id}>
          <p>{school.name}</p>
          <button onClick={() => deleteSchool(school.id)}>Delete Entry</button>
        </div>
      ))}
      <>{user.data?.name}</>
      <button onClick={() => addSchoolToUser()}>
        Add School to current User
      </button>
    </div>
  );
};

export default Schools;
