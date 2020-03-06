import { apiRequest } from "./httpService";

const sendEmail = async (emailOptions = {}) =>
  apiRequest("post", "/users/email", emailOptions);

const login = async (userData = {}) =>
  apiRequest("post", "/users/login", userData);

const register = async (userData = {}) =>
  apiRequest("post", "/users/register", userData);

const update = async (userData = {}) =>
  apiRequest("put", "/users/update/" + userData._id, userData);

export { sendEmail, login, register, update };
