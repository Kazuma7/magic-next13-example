"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Magic } from "magic-sdk";
import { magic } from "@/lib/magic";
import Loading from "@/components/Loading";
import { UserContext } from "@/context/UserContext";

const magicIns: Magic = magic as any;

const Callback: React.FC = ({ searchParams }: any) => {
  const router = useRouter();
  const [setUser]: any = useContext(UserContext);

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    searchParams.provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [searchParams.provider]);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async (): Promise<void> => {
    let result: any = await (magicIns.oauth as any).getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = (): void => {
    if (searchParams.magic_credential)
      magicIns.auth
        .loginWithCredential()
        .then((didToken: any) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken: string): Promise<void> => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    });
    console.log(res);

    if (res.status === 200) {
      let userMetadata: any = await magicIns.user.getMetadata();
      await setUser({ user: userMetadata });
      router.push("/profile");
    }
  };

  return <Loading />;
};

export default Callback;
