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

const initialState = {
  isAuth: false,
  isAdmin: false,
  user: {},
  error: null,
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case AUTO_AUTH_USER:
      return {
        ...state,
        ...action.payload
      };
    case DESTROY:
      return {
        ...state,
        isAuth: false,
        isAdmin: false
      };

    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuth: true,
        isAdmin: action.payload.role && action.payload.role === "admin",
        user: { ...action.payload }
      };
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export { initialState, reducer };
