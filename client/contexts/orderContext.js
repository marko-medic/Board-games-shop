import React, { createContext, useReducer, memo } from "react";
import { initialState, reducer } from "../store/orders/state";
import {
  getOrders,
  getCustomerOrders,
  createOrder,
  addToCart,
  openDrawer,
  closeDrawer,
  setDeliveryMethod,
  setShippingAddress,
  emptyCart,
  removeFromCart,
  autoInitOrders,
  destroy
} from "../store/orders/actions";

const OrderContext = createContext({
  ...initialState,
  openDrawer: () => {},
  closeDrawer: () => {},
  emptyCart: () => {},
  autoInitOrders: () => {},
  destroy: () => {},
  setShippingAddress: address => {},
  setDeliveryMethod: method => {},
  addToCart: game => {},
  removeFromCart: game => {},
  getOrders: async url => {},
  getCustomerOrders: async customerId => {},
  createOrder: async (userId, orderData) => {}
});
const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderContext.Provider
      value={{
        ...state,
        autoInitOrders: autoInitOrders(dispatch),
        openDrawer: openDrawer(dispatch),
        closeDrawer: closeDrawer(dispatch),
        emptyCart: emptyCart(dispatch),
        addToCart: addToCart(state, dispatch),
        removeFromCart: removeFromCart(state, dispatch),
        getOrders: getOrders(dispatch),
        getCustomerOrders: getCustomerOrders(dispatch),
        createOrder: createOrder(dispatch),
        setShippingAddress: setShippingAddress(dispatch),
        setDeliveryMethod: setDeliveryMethod(dispatch),
        destroy: destroy(dispatch)
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
