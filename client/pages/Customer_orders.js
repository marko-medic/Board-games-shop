import React, { useEffect, useContext } from "react";
import { withRouter } from "next/router";
import Loader from "react-loader-spinner";
import { isEmpty } from "lodash";
import { OrderContext } from "../contexts/OrderContext";
import { AuthContext } from "../contexts/AuthContext";
import { withAuth } from "../HOC/withAuth";
import { Order } from "../components/UI/Order";
import { SearchFilter } from "../components/UI/SearchFilter";

function Customer_orders({ router }) {
  const { getCustomerOrders, list, loading } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isEmpty(user)) {
      return;
    }
    let url = user._id;
    const searchTerm = router.query.search;
    if (searchTerm) {
      url += "?search=" + searchTerm;
    }
    getCustomerOrders(url);
  }, [user, router.query.search]);

  const renderOrders = () =>
    list.map((order, index) => (
      <Order key={order._id} index={index} order={order} />
    ));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="customer_orders">
      <h3>My orders:</h3>
      <SearchFilter placeholderText="Search by game name" />
      {isEmpty(list) ? (
        <h5>No orders found!</h5>
      ) : (
        <div className="row">{renderOrders()}</div>
      )}

      <style jsx>{`
        .customer_orders {
          text-align: center;
        }
        .row {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

export default withRouter(withAuth(Customer_orders, { authType: "user" }));
