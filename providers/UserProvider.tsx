"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { magic } from "@/lib/magic";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const magicIns: Magic = magic as any;

type User = {
  loading?: boolean;
  user?: any;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    setUser({ loading: true });
    magicIns.user.isLoggedIn().then((isLoggedIn) => {
      console.log(isLoggedIn);
      if (isLoggedIn) {
        magicIns.user.getMetadata().then((userData) => {
          console.log(userData);
          setUser({ user: userData });
        });
      } else {
        router.push("/login");
        setUser({ user: null });
      }
    });
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser } as any}>
      {children}
    </UserContext.Provider>
  );
};
