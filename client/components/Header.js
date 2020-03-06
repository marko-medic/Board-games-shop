import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/authContext";

function Header() {
  const { pathname, push } = useRouter();
  const { autoAuthUser, destroy, user, isAuth, isAdmin } = useContext(
    AuthContext
  );

  useEffect(() => {
    autoAuthUser();
  }, []);

  const logout = e => {
    e.preventDefault();
    destroy();
    push("/");
  };

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <ul>
            <li>
              <Link href="/">
                <a className={pathname === "/" ? "active" : null}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={pathname === "/about" ? "active" : null}>About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className={pathname === "/contact" ? "active" : null}>
                  Contact
                </a>
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href="/create">
                  <a className={pathname === "/create" ? "active" : null}>
                    Create board game
                  </a>
                </Link>
              </li>
            )}

            <div className="logo">
              <Link href="/">
                <a className="logo-link">
                  <img src="/images/logo.jpg" alt="logo" />
                </a>
              </Link>
            </div>
          </ul>
          <ul className="right">
            {isAuth ? (
              <>
                <li>
                  <Link href="/profile">
                    <a className={pathname === "/profile" ? "active" : null}>
                      {user.username}
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="/" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <a className={pathname === "/login" ? "active" : null}>
                      Login
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a className={pathname === "/register" ? "active" : null}>
                      Register
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <style jsx>{`
        nav {
          position: relative;
        }
        .active {
          color: black;
          background: white;
        }

        .logo-link:hover {
          background: initial;
        }

        .logo {
          position: absolute;
          left: 50%;
        }
        .logo img {
          height: 65px;
          width: 100px;
        }
      `}</style>
    </header>
  );
}

export { Header };
