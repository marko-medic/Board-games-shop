import { isEmpty } from "lodash";
import {
  DESTROY,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  AUTO_AUTH_USER
} from "./actionTypes";
import * as userService from "../../services/userService";

const autoAuthUser = dispatch => () => {
  let data = localStorage.getItem("user");
  let user = {};
  if (data && typeof data !== "undefined") {
    data = JSON.parse(data);
    user = data.user;
  }
  dispatch({
    type: AUTO_AUTH_USER,
    payload: {
      user,
      isAuth: !isEmpty(user),
      isCustomer: !isEmpty(user) && user.role === "user",
      isAdmin: user.role === "admin"
    }
  });
};

const destroy = dispatch => () => {
  localStorage.removeItem("user");
  dispatch({ type: DESTROY });
};

const registerUser = dispatch => async userData => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    const res = await userService.register(userData);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data.user });
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: err
    });
    throw err;
  }
};

const loginUser = dispatch => async userData => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    const res = await userService.login(userData);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data.user });
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: err
    });
    throw err;
  }
};

const updateUser = dispatch => async userData => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    const res = await userService.update(userData);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data.user });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: err
    });
    throw err;
  }
};

export { autoAuthUser, destroy, loginUser, registerUser, updateUser };
