import { useMyContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Cart.css";

export function Cart() {
  const { cart, logged, token, userId, increase, decrease } = useMyContext();
  const [getCart, setCart] = cart;
  const [getLoggedIn, setLoggedIn] = logged;
  const [getUserId, setUserId] = userId;
  const [getToken, setToken] = token;

  const navigate = useNavigate();

  const tdStyle = {
    textAlign: "center",
  }



  return (
    <div className="cartContainer">
      <h2>Cart</h2>
      <div className="cart">
        <table>
          <tbody>
          {getCart.map((product) => {
            return (
              <tr key={product._id}>
                <td>
                  <img
                    className="productImage"
                    src={"https://enigmatic-temple-40493.herokuapp.com/products/"+product.imgSrc}
                    alt="Depiction of a product"
                  ></img>
                </td>
                <td>{product.name}</td>
                <td>{product.price}€</td>
                <td>
                  <button
                    className="plusMinus"
                    onClick={() => {
                      decrease(product._id);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="plusMinus"
                    onClick={() => {
                      increase(product._id, product.stock);
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>

            );
          })}
          <tr>
            <td colSpan={6} style={tdStyle}>
              <div className="total">Total: {getTotal()}€</div>
            </td>
          </tr>
          <tr>
            <td colSpan={6} style={tdStyle}>
              <button style={{width: "100%"}}onClick={handleCheckout}>Buy Now</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  function getTotal() {
    return getCart.reduce((total, current) => {
      return (total += current.price * current.quantity);
    }, 0);
  }

  function handleCheckout() {
    // if not logged in redirect to /auth
    if (!getLoggedIn) {
      navigate("/auth");
      return -1;
    }
    if (getCart.length < 1) {
      navigate("/products");
      return -1;
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
    fetch("https://enigmatic-temple-40493.herokuapp.com/users/" + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => {})
      .catch((error) => console.log(error));

    // Decrease products quantity in stock
    getCart.map((product) => {
      console.log(product._id);
      const productId = product._id;
      const quantity = product.quantity * -1;
      fetch("https://enigmatic-temple-40493.herokuapp.com/products/" + productId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${getToken}`,
        },
        body: JSON.stringify({ quantity: quantity }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("error");
          }
          return res.json();
        })
        .then((data) => {
          // Clear the cart after successful checkout
          setCart([]);
          
        });
    });
    navigate("/my-orders");
  }
}
