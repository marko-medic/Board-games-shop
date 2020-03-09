import React, { useState, useContext, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import { OrderContext } from "../../contexts/OrderContext";
import { CartOrders } from "../UI/CartOrders";

function SideDrawer() {
  const [className, setClassName] = useState("");
  const { isDrawerOpen, closeDrawer, cartItemsCount, emptyCart } = useContext(
    OrderContext
  );
  const router = useRouter();

  const closeDrawerHandler = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeDrawer();
  };

  const keyboardListener = e => {
    if (e.key !== "Escape") {
      return;
    }
    closeDrawer();
  };

  useEffect(() => {
    setTimeout(() => {
      if (isDrawerOpen) {
        setClassName("animated slideInRight");
      } else {
        setClassName("");
      }
    }, 0);
  }, [isDrawerOpen]);

  useEffect(() => {
    window.addEventListener("keydown", keyboardListener);
    return () => window.removeEventListener("keydown", keyboardListener);
  }, []);

  return (
    <div
      onClick={closeDrawerHandler}
      className={`sideDrawer ${isDrawerOpen ? "opened" : ""}`}
    >
      <div className={`drawer-content ${className}`}>
        <h4>Your shopping cart:</h4>
        {cartItemsCount > 0 ? (
          <div className="cart card">
            <strong className="card-title">Ordered games</strong>
            <CartOrders showButtons />
            <button className="btn red" onClick={() => emptyCart()}>
              Empty your cart
            </button>
            <button
              onClick={() => {
                closeDrawer();
                router.push("/checkout");
              }}
              className="btn green"
            >
              PROCEED
            </button>
          </div>
        ) : (
          <strong>Your cart is currently empty</strong>
        )}
      </div>
      <style jsx>{`
        .sideDrawer {
          position: fixed;
          overflow-x: scroll;
          display: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #4e4e4ef0;
          z-index: 11;
        }
        .drawer-content {
          transform: translateX(250px);
          background: white;
          height: 100%;
          width: 250px;
          position: fixed;
          overflow-x: scroll;
          text-align: center;
          right: 0;
          padding: 1rem;
        }
        .opened {
          display: block;
        }
        button {
          margin-top: 0.5rem;
          margin: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export { SideDrawer };
