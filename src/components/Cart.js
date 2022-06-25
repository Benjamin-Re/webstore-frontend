import { useMyContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Cart() {
  const { cart, logged, token, userId } = useMyContext();
  const [getCart, setCart] = cart;
  const [getLoggedIn, setLoggedIn] = logged;
  const [getUserId, setUserId] = userId;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("render");
  }, [getCart]);

  return (
    <>
      <h2>Cart</h2>
      <ul>
        {getCart.map((product) => {
          return (
            <li>
              {product.name}, {product.price}€
            </li>
          );
        })}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );

  function handleCheckout() {
    /* Many things:
      check if user logged in
      if so send
          put request to update getCart in db
          send post request to update orders in db
          get request to get the order and display order confirmation*/

    // if not logged in redirect to /auth
    if (!getLoggedIn) {
      navigate("/auth");
    }

    // Prepare the order
    let order = {
      products: getCart,
      total: getCart.reduce((total, current) => {
        return (total += current.price);
      }, 0),
    };
    // Current user's id
    let userId = getUserId;

    // Put request to user, to add the order to him
    // http://localhost:8000
    // https://enigmatic-temple-40493.herokuapp.com
    fetch("https://enigmatic-temple-40493.herokuapp.com/users/" + userId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Clear the cart after successful checkout
        setCart([]);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
}
