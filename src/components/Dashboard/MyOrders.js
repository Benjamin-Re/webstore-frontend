import { useMyContext } from "../../Context";
import { useEffect, useState } from "react";
import "../../styles/MyOrders.css";

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
        month = typeof date.getMonth();
    }
    let fullDate = day + " " + month + " " + date.getFullYear();
    return fullDate;
  }

  return (
    <>
      <div className="orderContainer">
      <h2>Your Orders</h2>
        <div>
          {getOrders.map((order, index) => {
            return (
              <table key={index} className="orderTable">
                <tbody>
              <tr>
                <td style={{fontWeight: "800"}}>Order Nr. {index + 1}</td>
                <td>{dateResolver(new Date(order.date))}</td>
                <td></td>
              </tr>
                {order.products.map((product) => {
                  return (
                    <tr key={product._id} className="productRow">
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}???</td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td style={{fontWeight: "800"}}>Total:</td>
                  <td style={{fontWeight: "800"}}>{order.total}???</td>
                </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    </>
  );
}

