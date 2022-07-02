import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from '../../Context';


export function Dashboard() {
  const { cart, logged, token, userId } = useMyContext();
  const [getCart, setCart] = cart;
  const [getLoggedIn, setLoggedIn] = logged;
  const [getToken, setToken] = token;
  const [getUserId, setUserId] = userId;
  const navigate = useNavigate();
  
  
  return (
    <>
      <h1>Welcome to your Dashboard</h1>
      <div>
        <Link to="/my-orders">
          <h3>Your past orders</h3>
        </Link>
        <Link to="/profile-details">
          <h3>Change profile details</h3>
        </Link>
        <button onClick={ handleLogout }>
          <h3>Logout</h3>
        </button>
      </div>
    </>
  );
  
  function handleLogout() {
    // Apart from redirect also clear login, userId, token, cart
    setCart([]);
    setLoggedIn(false);
    setToken("");
    setUserId("");
    navigate("/");
  }
}
