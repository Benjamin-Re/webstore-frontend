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

  useEffect(() => {
    console.log(getCart);
  }, [getCart]);

  return (
    <div className="cartContainer">
      <h2>Cart</h2>
      <div className="cart">
        <table>
          {getCart.map((product) => {
            return (
              <tr>
                <td>
                  <img
                    className="productImage"
                    src={product.imgSrc}
                    alt="Depiction of a product"
                  ></img>
                </td>
                <td>{product.name}</td>
                <td>{product.price}€</td>
                <td>
                  <button
                    className="plusMinus"
                    onClick={() => {
                      decrease(product.id);
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
                      increase(product.id, product.stock);
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
              //  <div className="cartItem">
              //     <img className="productImage" src={product.imgSrc} alt="Depiction of a product"></img>
              //     <div className="article">
              //       {product.name} {product.price}€
              //     </div>
              //     <div className="buttonSection">
              //     <button className="plusMinus"
              //       onClick={() => {
              //         decrease(product.id);
              //       }}
              //     >
              //       -
              //     </button>
              //     <span>{product.quantity}</span>
              // <button className="plusMinus"
              //   onClick={() => {
              //     increase(product.id, product.stock);
              //   }}
              // >
              //   +
              // </button>
              //     </div>
              //   </div>
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
    console.log(getLoggedIn);

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
      fetch("https://enigmatic-temple-40493.herokuapp.com/products" + id, {
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
