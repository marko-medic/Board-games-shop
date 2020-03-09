import React, { useContext, useEffect } from "react";
import { withRouter } from "next/router";
import { isEmpty } from "lodash";
import Loader from "react-loader-spinner";
import { withAuth } from "../HOC/withAuth";
import { OrderContext } from "../contexts/OrderContext";
import { Order } from "../components/UI/Order";
import { SearchFilter } from "../components/UI/SearchFilter";
import { Sorter } from "../components/UI/Sorter";
import { storeAndGetUrlParams } from "../shared/helpers";

function Orders({ router }) {
  const { getOrders, list, loading } = useContext(OrderContext);

  useEffect(() => {
    const params = storeAndGetUrlParams(router.query, {}).toString();
    getOrders(`?${params}`);
  }, [router.asPath]);

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
      <Sorter items={["orderDate", "shippingAddress", "deliveryType"]} />
      {isEmpty(list) ? (
        <h5>No orders found!</h5>
      ) : (
        <div className="row mt-1">{renderOrders()}</div>
      )}
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
