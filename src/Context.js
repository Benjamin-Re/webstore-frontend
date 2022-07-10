import React, { useContext, useState, useEffect } from "react";

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
  const cartQuantity = getCart.reduce(
    (accumulator, current) => {
      return accumulator + current.quantity;
    }, 0
  )

  const [getLoggedIn, setLoggedIn] = useState(false);
  const [getToken, setToken] = useState();
  const [getUserId, setUserId] = useState("");
  const [getRole, setRole] = useState("");
  const [getProducts, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://enigmatic-temple-40493.herokuapp.com/products/")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data);
      });
  }, []);


  // Store user login data (id, loggedin, token) in session
  useEffect(()=>{
    let data = sessionStorage.getItem("user-data");
    if(data){
      data = JSON.parse(data);
      setLoggedIn(data.loggedIn);
      setToken(data.token);
      setUserId(data.userId);
      setCart(data.cart);
      setRole(data.role);
    }
  }, []);

  // Save the data on every render
  useEffect(()=>{
    let data = {
      loggedIn: getLoggedIn,
      token: getToken,
      userId: getUserId,
      cart: getCart,
      role: getRole,
    }
    sessionStorage.setItem("user-data", JSON.stringify(data));
  })



  function getItemQuantity(id) {
    return getCart.find(item => item._id === id)?.quantity || 0;
  }

  function increaseQuantity(id, stock) {
   
    setCart(currItems => {
     
        return currItems.map(item => {
          if (item._id === id) {
            if(item.quantity < stock){
              return { ...item, quantity: item.quantity + 1 }
            } else {
              return item
            }
          } else {
            return item
          }
        })
      
    })
  }

  function decreaseCartQuantity(id) {
    setCart(currItems => {
      if (currItems.find(item => item._id === id)?.quantity === 1) {
        return currItems.filter(item => item._id !== id)
      } else {
        return currItems.map(item => {
          if (item._id === id) {
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
        role: [getRole, setRole],
        getQuantity: getItemQuantity,
        increase: increaseQuantity,
        decrease: decreaseCartQuantity,
        cartQuantity,
        products: [getProducts, setProducts]
      }}
    >
      {" "}
      {/*This provides the state variable*/}
      {children}
    </Context.Provider>
  );
}
