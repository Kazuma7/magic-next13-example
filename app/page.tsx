"use client";

import Loading from "@/components/Loading";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Home() {
  const { user }: any = useContext(UserContext);
  return (
    <main>
      {user?.loading ? (
        <Loading />
      ) : user?.user?.issuer ? (
        <div className="max-w-screen-lg mx-auto h-24 flex items-center">
          You are logged in!
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto h-24 flex items-center">
          You are not logged in!
        </div>
      )}
    </main>
  );
}
