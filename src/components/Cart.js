import { useMyContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Cart() {
  const { cart, logged, token, userId, getQuantity, increase, decrease } =
    useMyContext();
  const [getCart, setCart] = cart;
  const [getLoggedIn, setLoggedIn] = logged;
  const [getUserId, setUserId] = userId;
  const [getToken, setToken] = token;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(getCart);
  }, [getCart]);

  return (
    <>
      <h2>Cart</h2>
      <ul>
        {getCart.map((product) => {
          return (
            <li>
              {product.name}, {product.price}€, {product.quantity} units,
              <button
                onClick={() => {
                  increase(product.id);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  decrease(product.id);
                }}
              >
                -
              </button>
            </li>
          );
        })}
      </ul>
      <div className="total">Total: {getTotal()}</div>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );

  // function removePost(product) {
  //   let itemQuant = getQuant(1);
  //   console.log(itemQuant);
  //   // setCart(prevState=>{
  //   //   let newState = prevState;
  //   //   console.log(e.target.id)
  //   //   newState = newState.filter(elem=>{
  //   //     console.log(elem.id)
  //   //     return elem.id === e.target.id;
  //   //   });
  //   //   console.log(newState)
  //   //   return newState;
  //   // });
  // }

  function getTotal() {
    return getCart.reduce((total, current) => {
      return (total += current.price * current.quantity);
    }, 0);
  }

  function handleCheckout() {
    console.log(getToken);
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
      date: new Date(),
      products: getCart,
      total: getTotal(),
    };
    // Current user's id
    let userId = getUserId;

    // Put request to user, to add the order to him
    // http://localhost:8000
    // https://enigmatic-temple-40493.herokuapp.com
    fetch("http://localhost:8000/users/" + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("errpr");
        }
        return res.json();
      })
      .then((data) => {})
      .catch((error) => console.log(error));

    // Decrease products quantity in stock
    getCart.map((product) => {
      const id = product.id;
      const quantity = product.quantity * -1;
      fetch("http://localhost:8000/products/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${getToken}`,
        },
        body: JSON.stringify({ quantity: quantity }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("errpr");
          }
          return res.json();
        })
        .then((data) => {
          // Clear the cart after successful checkout
          setCart([]);
          console.log(data);
        });
    });
    navigate("/my-orders");
  }
}
