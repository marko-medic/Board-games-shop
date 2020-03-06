import axios from "axios";
import { get } from "lodash";
import { getSessionToken, destroy } from "./sessionService";

const URL = "http://localhost:5000";

axios.interceptors.response.use(
  response => {
    // Do something with response data
    // return response body
    return response.data;
  },
  error => {
    // Handle response error
    _handleError(error);
    return Promise.reject(error);
  }
);

async function apiRequest(method, apiUrl, body, headers) {
  try {
    const apiToken = getSessionToken();
    const requestHeaders = !headers ? {} : headers;
    if (apiToken) requestHeaders["x-access-token"] = apiToken;
    if (method === "get" || method === "delete")
      return axios[method](URL + "/api/v1" + apiUrl, {
        headers: requestHeaders
      });
    else if (method === "post" || method === "put" || method === "patch") {
      return axios[method](URL + "/api/v1" + apiUrl, body, {
        headers: requestHeaders
      });
    }
  } catch (err) {
    _handleError(err);
  }
}

async function outsideRequest(method, url, body, headers) {
  try {
    const requestHeaders = !headers ? {} : headers;

    if (method === "get" || method === "delete")
      return axios[method](url, { headers: requestHeaders });
    else if (method === "post" || method === "put")
      return axios[method](url, body, { headers });
  } catch (err) {
    _handleError(err);
  }
}

function _handleError(err) {
  let errorText = "";
  if (err && err.response) {
    if (err.response.status === 401 || err.response.status === 403) {
      // remove user data
      // destroy();
    }
    if (
      err.response.data &&
      err.response.data.error &&
      err.response.data.error.message
    ) {
      errorText = err.response.data.error.message;
    } else {
      errorText = err.response.statusText;
    }
    console.warn(errorText);
  }
  throw err;
}

export { apiRequest, outsideRequest };
