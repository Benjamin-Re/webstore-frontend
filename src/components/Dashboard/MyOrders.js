import { useMyContext } from "../../Context";
import { useEffect, useState } from "react";
import css from "../../styles/MyOrders.css";

export function MyOrders() {
  const { cart, logged, token, userId } = useMyContext();
  const [getUserId, setUserId] = userId;
  const [getToken, setToken] = token;
  const [getOrders, setOrders] = useState([]);

  // https://enigmatic-temple-40493.herokuapp.com/users
  // http://localhost:8000/users
  useEffect(() => {
    fetch(`https://enigmatic-temple-40493.herokuapp.com/users/` + getUserId, {
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

  // date creator utility function
  function dateResolver(date) {
    let day = date.getDate();
    let month = "";
    switch (date.getMonth()) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = typeof(date.getMonth());
    }
    let fullDate = day+ " " + month + " "+ date.getFullYear();
    return fullDate;
  }

  return (
    <>
      <h1>My Orders</h1>
      <div className="orders-container">
        {getOrders.map((order) => {
          return (
            <div className="order">
              Date: {dateResolver(new Date(order.date))}, 
              Total: {order.total}€, 
              <br></br>
              Products:{" "} 
              {order.products.map((product) => {
                return (
                  <ul>
                    <li>{product.name},{" "} </li>
                    <li>{product.price}€,{" "} </li>
                    <li>{product.quantity} units {" "}</li>
                  </ul>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
