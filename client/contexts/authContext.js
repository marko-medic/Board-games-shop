import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../store/auth/state";
import {
  destroy,
  loginUser,
  registerUser,
  updateUser,
  autoAuthUser
} from "../store/auth/actions";

const AuthContext = createContext({
  ...initialState,
  autoAuthUser: () => {},
  destroy: () => {},
  loginUser: async userData => {},
  registerUser: async userData => {},
  updateUser: async userData => {}
});
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        autoAuthUser: autoAuthUser(dispatch),
        destroy: destroy(dispatch),
        registerUser: registerUser(dispatch),
        loginUser: loginUser(dispatch),
        updateUser: updateUser(dispatch)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
