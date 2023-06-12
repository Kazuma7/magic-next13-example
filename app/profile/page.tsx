"use client";

import Loading from "@/components/Loading";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Home() {
  const [user]: any = useContext(UserContext);

  return (
    <div>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.user.issuer && (
          <div>
            <div className="text-black">Email</div>
            <div className="profile-info">{user.user.email}</div>

            <div className="text-black">User Id</div>
            <div className="profile-info">{user.user.issuer}</div>
          </div>
        )
      )}
      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}
