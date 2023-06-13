"use client";

import Loading from "@/components/Loading";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Home() {
  const { user }: any = useContext(UserContext);

  return (
    <div className="max-w-screen-lg mx-auto mt-4">
      {user?.loading ? (
        <Loading />
      ) : (
        user?.user?.issuer && (
          <div>
            <div className="text-black mt-8">Email</div>
            <div>{user.user.email}</div>

            <div className="text-black mt-8">User Id</div>
            <div>{user.user.issuer}</div>
          </div>
        )
      )}
    </div>
  );
}
