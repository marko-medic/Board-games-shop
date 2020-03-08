import { apiRequest } from "./httpService";

const getOrders = async (url = "") => apiRequest("/get", "/orders/" + url);

const getCustomerOrders = async customerId =>
  apiRequest("get", "/orders/" + customerId);

const createOrder = async (userId, orderData) =>
  apiRequest("post", "/orders/" + userId, orderData);

export { getOrders, getCustomerOrders, createOrder };
