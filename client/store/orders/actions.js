import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  ADD_TO_CART,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_SHIPPING_ADDRESS,
  SET_DELIVERY_METHOD,
  EMPTY_CART,
  REMOVE_FROM_CART,
  AUTO_INIT_ORDERS,
  DESTROY
} from "./actionTypes";

import * as orderService from "../../services/orderService";

const getOrders = dispatch => async () => {
  try {
    dispatch({
      type: GET_ORDERS_REQUEST
    });
    const res = await orderService.getOrders();
    dispatch({ type: GET_ORDERS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAILURE,
      payload: err
    });
    throw err;
  }
};

const createOrder = dispatch => async (userId, orderData) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    const res = await orderService.createOrder(userId, orderData);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: err
    });

    throw err;
  }
};

const addToCart = (state, dispatch) => payload => {
  localStorage.setItem("orders", JSON.stringify(state));
  dispatch({ type: ADD_TO_CART, payload });
};

const removeFromCart = (state, dispatch) => payload => {
  localStorage.setItem("orders", JSON.stringify(state));
  dispatch({ type: REMOVE_FROM_CART, payload });
};

const openDrawer = dispatch => () => dispatch({ type: OPEN_DRAWER });

const closeDrawer = dispatch => () => dispatch({ type: CLOSE_DRAWER });

const setShippingAddress = dispatch => payload =>
  dispatch({ type: SET_SHIPPING_ADDRESS, payload });

const setDeliveryMethod = dispatch => payload =>
  dispatch({ type: SET_DELIVERY_METHOD, payload });

const autoInitOrders = dispatch => () => {
  const orders = localStorage.getItem("orders");
  if (orders && typeof orders !== "undefined") {
    dispatch({ type: AUTO_INIT_ORDERS, payload: JSON.parse(orders) });
  }
};

const destroy = dispatch => () => {
  localStorage.removeItem("orders");
  dispatch({
    type: DESTROY
  });
};

const emptyCart = dispatch => () => dispatch({ type: EMPTY_CART });

export {
  getOrders,
  createOrder,
  addToCart,
  removeFromCart,
  openDrawer,
  closeDrawer,
  setShippingAddress,
  setDeliveryMethod,
  autoInitOrders,
  emptyCart,
  destroy
};
