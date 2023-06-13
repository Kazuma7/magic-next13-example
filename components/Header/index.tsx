"use client";

import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { magic } from "@/lib/magic";
import { Magic } from "magic-sdk";
import { useRouter } from "next/navigation";

const magicIns: Magic = magic as any;

const Header = () => {
  const { user, setUser }: any = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    magicIns.user.logout().then(() => {
      setUser({ user: null });
      router.push("/login");
    });
  };

  return (
    <header className=" bg-gray-100">
      <ul className="max-w-screen-lg mx-auto flex justify-start gap-8 h-16 items-center ">
        {user?.loading ? (
          <div style={{ height: "38px" }}></div>
        ) : user?.user?.issuer ? (
          <>
            <li>
              <Link href="/">
                <div>Home</div>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <div>Profile</div>
              </Link>
            </li>
            <li>
              <a>
                <button onClick={logout}>Logout</button>
              </a>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
