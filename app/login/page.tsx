"use client";

import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Magic } from "magic-sdk";
import { magic } from "@/lib/magic";
import EmailForm from "@/components/EmailForm";
import SocialLogins from "@/components/SocialLogins";
import { useRouter } from "next/navigation";

const magicIns: Magic = magic as any;

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const { user, setUser }: any = useContext(UserContext);
  const router = useRouter();

  // Redirec to /profile if the user is logged in
  useEffect(() => {
    user?.user?.issuer && router.push("/profile");
  }, [user]);

  async function handleLoginWithEmail(email: any) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magicIns.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        let userMetadata = await magicIns.user.getMetadata();
        await setUser({ user: userMetadata });
        router.push("/profile");
      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  }

  async function handleLoginWithSocial(provider: any) {
    await (magicIns.oauth as any).loginWithRedirect({
      provider,
      redirectURI: new URL("/callback", window.location.origin).href,
    });
  }

  return (
    <div className="max-w-sm shadow-md mx-auto border p-4 text-center rounded-2xl mt-12">
      <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      <SocialLogins onSubmit={handleLoginWithSocial} />
    </div>
  );
};

export default Login;
