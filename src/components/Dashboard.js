import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export function Dashboard() {
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
        <button onClick={ handleClick }>
          <h3>Logout</h3>
        </button>
      </div>
    </>
  );
  
  function handleClick() {
      navigate("/");
      // Apart from redirect also clear login, userId, token, cart
  }
}
