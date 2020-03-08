import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { OrderContext } from "../contexts/OrderContext";
import { AuthContext } from "../contexts/AuthContext";
import { withAuth } from "../HOC/withAuth";
import { CartOrders } from "../components/UI/CartOrders";

function Checkout() {
  const {
    order,
    cartItemsCount,
    setDeliveryMethod,
    setShippingAddress,
    createOrder,
    emptyCart,
    loading
  } = useContext(OrderContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const submitHandler = async e => {
    e.preventDefault();
    if (!_isStateValid()) {
      return;
    }
    try {
      await createOrder(user._id, order);
      toast.success("Your order is successfull!");
      emptyCart();
      router.push("/");
    } catch (err) {
      console.dir(err);
      toast.error("Something is wrong!");
    }
  };

  const _isStateValid = () =>
    order.shippingAddress.trim().length !== 0 &&
    order.deliveryType.trim().length !== 0;

  useEffect(() => {
    if (cartItemsCount === 0) {
      toast.error("You are not allowed to visit this page");
      router.push("/");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="checkout">
      <h3>Checkout</h3>
      <strong>Orders:</strong>
      <CartOrders
        totalPrice={order.totalPrice}
        orderList={order.orderedGames}
      />
      <div className="input-field col s12">
        <form onSubmit={submitHandler}>
          <input
            required
            value={order.shippingAddress}
            onChange={e => setShippingAddress(e.target.value)}
            placeholder="Choose shipping address"
            type="text"
            className="validate"
          />
          <select
            required
            value={order.deliveryType || "initial"}
            onChange={e => setDeliveryMethod(e.target.value)}
          >
            <option value="initial" disabled>
              Choose your delivery type
            </option>
            <option value="fast">Regular</option>
            <option value="regular">Fast</option>
          </select>
          <button
            type="submit"
            className="btn"
            disabled={_isStateValid() ? "" : "disabled"}
          >
            ORDER
          </button>
        </form>
      </div>
      <style jsx>{`
        .checkout {
          text-align: center;
        }
        form {
          margin-top: 1rem;
          width: 300px;
          margin: auto;
        }
        select {
          display: block;
          padding: 0.4rem;
          width: 100%;
        }
        button {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default withAuth(Checkout, { authType: "user" });
