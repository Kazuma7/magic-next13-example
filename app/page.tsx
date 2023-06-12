"use client";

import Loading from "@/components/Loading";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Home() {
  const [user]: any = useContext(UserContext);
  return (
    <main>
      {user?.loading ? (
        <Loading />
      ) : user?.issuer ? (
        <div>You are logged in!</div>
      ) : (
        <div>You are not logged in!</div>
      )}
    </main>
  );
}
