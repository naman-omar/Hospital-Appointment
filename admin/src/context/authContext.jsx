/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
  const initialState = {
    user: null,
    role: null,
    token: null,
  };

  try {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      initialState.user = JSON.parse(userFromStorage);
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }

  initialState.role = localStorage.getItem("role") || null;
  initialState.token = localStorage.getItem("token") || null;

  return initialState;
};

const initialState = getInitialState();

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
