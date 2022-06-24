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
  const [getToken, setToken] = useState();

  // wrap setCartState in a function so the spreading of the old array and adding of new element is taken care of
  function setCart(arg) {
    setCartState((oldArray) => [...oldArray, arg]);
  }

  // Declare the values you want to pass to the children
  return (
    <Context.Provider
      value={{
        cart: [getCartState, setCart],
        logged: [getLoggedIn, setLoggedIn],
        token: [getToken, setToken],
      }}
    >
      {" "}
      {/*This provides the state variable*/}
      {children}
    </Context.Provider>
  );
}
