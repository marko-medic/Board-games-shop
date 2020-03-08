import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

function Header() {
  const { pathname, push } = useRouter();
  const {
    autoAuthUser,
    destroy,
    user,
    isAuth,
    isAdmin,
    isCustomer
  } = useContext(AuthContext);
  const {
    cartItemsCount,
    openDrawer,
    autoInitOrders,
    destroy: ordersDestroy
  } = useContext(OrderContext);

  useEffect(() => {
    autoAuthUser();
    autoInitOrders();
  }, []);

  const logout = e => {
    e.preventDefault();
    destroy();
    ordersDestroy();
    push("/");
  };

  const cartHandler = e => {
    e.preventDefault();
    openDrawer();
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
                    Insert board game
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
            {isCustomer && (
              <li>
                <Link href="/customer_orders">
                  <a
                    className={
                      pathname === "/customer_orders" ? "active" : null
                    }
                  >
                    My orders
                  </a>
                </Link>
              </li>
            )}
            {isCustomer && pathname !== "/checkout" && (
              <li>
                <a className="d-flex" href="/" onClick={cartHandler}>
                  <i className="material-icons">shopping_cart </i>
                  {cartItemsCount > 0 && (
                    <span className="cart-circle">{cartItemsCount}</span>
                  )}
                </a>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link href="/orders">
                  <a className={pathname === "/orders" ? "active" : null}>
                    Orders
                  </a>
                </Link>
              </li>
            )}
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
        .d-flex {
          display: flex;
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
        .cart-circle {
          color: black;
          background: white;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          margin-top: 10px;
          font-weight: bold;
        }
      `}</style>
    </header>
  );
}

export { Header };
