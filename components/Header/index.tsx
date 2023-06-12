import { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { UserContext } from "@/context/UserContext";
import { magic } from "@/lib/magic";
import { Magic } from "magic-sdk";

const magicIns: Magic = magic as any;

const Header = () => {
  const [user, setUser]: any = useContext(UserContext);

  const logout = () => {
    magicIns.user.logout().then(() => {
      setUser({ user: null });
      Router.push("/login");
    });
  };

  return (
    <header>
      <nav>
        <ul>
          {user?.loading ? (
            // If loading, don't display any buttons specific to the loggedIn state
            <div style={{ height: "38px" }}></div>
          ) : user?.issuer ? (
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
      </nav>
      <style jsx>{`
        nav {
          max-width: 45rem;
          margin: 0 auto 50px;
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }
        ul {
          display: flex;
          list-style: none;
        }
        li {
          margin-right: 1.5rem;
          line-height: 38px;
        }
        li:first-child {
          margin-left: auto;
        }
      `}</style>
    </header>
  );
};

export default Header;
