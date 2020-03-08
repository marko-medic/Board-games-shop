import { apiRequest } from "./httpService";

const getOrders = async () => apiRequest("get", "/orders");

const createOrder = async (userId, orderData) =>
  apiRequest("post", "/orders/" + userId, orderData);

export { getOrders, createOrder };
