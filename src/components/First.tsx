import React from "react";
import  {useUserQuery}  from "../hook/query/user";


export default function First() {
  const { loading, error, data} = useUserQuery();


  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {data.getAllUser.map((launch:any) => (
          <li key={launch.id}>{launch.firstName}</li>
        ))}
      </ul>
    </div>
  );
}
