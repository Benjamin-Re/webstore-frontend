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
  const [getCart, setCart] = useState(initialArray);

  const [getLoggedIn, setLoggedIn] = useState(false);
  const [getToken, setToken] = useState();
  const [getUserId, setUserId] = useState("");

  function getItemQuantity(id) {
    return getCart.find(item => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id) {
    console.log("increase")
    setCart(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        const product = {id, quantity: 1}
        console.log(product)
        return [...currItems, product]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id) {
    setCart(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }


  // Declare the values you want to pass to the children
  return (
    <Context.Provider
      value={{
        cart: [getCart, setCart],
        logged: [getLoggedIn, setLoggedIn],
        token: [getToken, setToken],
        userId: [getUserId, setUserId],
        getQuantity: getItemQuantity,
        increase: increaseQuantity,
        decrease: decreaseCartQuantity,
      }}
    >
      {" "}
      {/*This provides the state variable*/}
      {children}
    </Context.Provider>
  );
}
