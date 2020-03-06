import { get } from "lodash";

const isData = data => {
  return data && data !== "undefined";
};

const getUsername = () => {
  let data = localStorage.getItem("user");
  if (!isData(data)) {
    return null;
  }
  data = JSON.parse(data);
  const username = get(data, "user.username", null);
  return username;
};

const getSessionToken = () => {
  let data = localStorage.getItem("user");
  if (!isData(data)) return null;
  data = JSON.parse(data);
  const session = get(data, "token", null);
  return session;
};

const destroy = () => localStorage.clear();

export { getUsername, getSessionToken, destroy };
