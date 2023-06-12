"use client";

import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import { UserContext } from "@/context/UserContext";
import { Magic } from "magic-sdk";
import { magic } from "@/lib/magic";
import EmailForm from "@/components/EmailForm";
import SocialLogins from "@/components/SocialLogins";

const magicIns: Magic = magic as any;

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser]: any = useContext(UserContext);

  // Redirec to /profile if the user is logged in
  useEffect(() => {
    user?.issuer && Router.push("/profile");
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
        // Set the UserContext to the now logged in user
        let userMetadata = await magicIns.user.getMetadata();
        await setUser(userMetadata);
        Router.push("/profile");
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  async function handleLoginWithSocial(provider: any) {
    await (magicIns.oauth as any).loginWithRedirect({
      provider, // google, apple, etc
      redirectURI: new URL("/callback", window.location.origin).href, // required redirect to finish social login
    });
  }

  return (
    <div className="login">
      <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
      <SocialLogins onSubmit={handleLoginWithSocial} />
      <style jsx>{`
        .login {
          max-width: 20rem;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Login;
