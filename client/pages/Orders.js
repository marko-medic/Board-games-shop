import React, { useContext, useEffect } from "react";
import { withRouter } from "next/router";
import Loader from "react-loader-spinner";
import { withAuth } from "../HOC/withAuth";
import { OrderContext } from "../contexts/OrderContext";
import { Order } from "../components/UI/Order";
import { SearchFilter } from "../components/UI/SearchFilter";

function Orders({ router }) {
  const { getOrders, list, loading } = useContext(OrderContext);

  useEffect(() => {
    let url = "";
    if (router.query.search) {
      url = "?search=" + router.query.search;
    }
    getOrders(url);
  }, [router.query.search]);

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
      <SearchFilter placeholderText="Search by customer name" />
      <div className="row mt-1">{renderOrders()}</div>
      <style jsx>{`
        .orders {
          text-align: center;
        }
        .mt-1 {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

export default withRouter(withAuth(Orders, { authType: "admin" }));
