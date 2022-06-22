import React, { useContext, useState } from "react";

// Create two contexts
const Context = React.createContext(); // This is used in Context.Provider
const UpdateContext = React.createContext(); // This is used in UpdateContext.Provider

// CUSTOM HOOKS, must start with use*
export function useGetCart() {
  return useContext(Context);
}
export function useSetCart() {
  return useContext(UpdateContext);
}

// Provide the context, used in APP
export function ContextProvider({ children }) {
  const initialArray = [];
  const [getCartState, setCartState] = useState(initialArray);

  // wrap setCartState in a function so the spreading of the old array and adding of new element is taken care of
  function setCart(arg) {
    setCartState((oldArray) => [...oldArray, arg]);
  }
  

  // Declare the values you want to pass to the children
  return (
    <Context.Provider value={getCartState}> {/*This provides a the state variable*/}
      <UpdateContext.Provider value={setCart}> {/*This provides a function*/}
        {children}
      </UpdateContext.Provider>
    </Context.Provider>
  );
}
