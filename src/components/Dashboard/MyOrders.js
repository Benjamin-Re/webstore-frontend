import { useMyContext } from "../../Context";
import { useEffect, useState } from "react";
import css from "./MyOrders.css";

export function MyOrders() {
  const { cart, logged, token, userId } = useMyContext();
  const [getUserId, setUserId] = userId;
  const [getToken, setToken] = token;
  const [getOrders, setOrders] = useState([]);

  // https://enigmatic-temple-40493.herokuapp.com/users
  // http://localhost:8000/users
  useEffect(() => {
    fetch(`http://localhost:8000/users/` + getUserId, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setOrders(json.data.orders);
      });
  }, []);

  return (
    <>
      <h1>My Orders</h1>
      <div className="orders-container">
        {getOrders.map((order) => {
          return (
            <div className="order">
              Date: {order.date}
              Total: {order.total}
              Products: {order.products.map((product) => {
               return (
               <>
                  {product.name}
                  {product.price}
                  {product.quantity}
                </>
              )
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
