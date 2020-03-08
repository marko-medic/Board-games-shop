import React, { useContext, useEffect } from "react";
import Loader from "react-loader-spinner";
import { withAuth } from "../HOC/withAuth";
import { OrderContext } from "../contexts/orderContext";
import { Order } from "../components/Order";

function Orders() {
  const { getOrders, list, loading } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, []);

  const renderOrders = () =>
    list.map((order, index) => (
      <Order key={order._id} index={index} order={order} />
    ));

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="orders">
      <h3>Order list:</h3>
      <div className="row">{renderOrders()}</div>
      <style jsx>{`
        .orders {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default withAuth(Orders, { authType: "admin" });
