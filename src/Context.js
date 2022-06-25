import React, { useContext, useState } from "react";

// Create two contexts
const Context = React.createContext(); // This is used in Context.Provider

// CUSTOM HOOKS, must start with use*
export function useMyContext() {
  return useContext(Context);
}

// Provide the context, used in APP
export function ContextProvider({ children }) {
  const initialArray = [];
  const [getCartState, setCartState] = useState(initialArray);
  const [getLoggedIn, setLoggedIn] = useState(false);
  const [getToken, setToken] = useState("");
  const [getUserId, setUserId] = useState("");

  // Declare the values you want to pass to the children
  return (
    <Context.Provider
      value={{
        cart: [getCartState, setCartState],
        logged: [getLoggedIn, setLoggedIn],
        token: [getToken, setToken],
        userId: [getUserId, setUserId]
      }}
    >
      {" "}
      {/*This provides the state variable*/}
      {children}
    </Context.Provider>
  );
}
