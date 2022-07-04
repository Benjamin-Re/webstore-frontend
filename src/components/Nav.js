import { Link } from "react-router-dom";
import { useMyContext } from "../Context";
import "../styles/Nav.css";
import { FaBars } from "react-icons/fa";

export function Nav() {
  const { cart, logged, token, cartQuantity } = useMyContext();
  const [getLoggedIn, setLoggedIn] = logged;
  const iconStyle = {
    fontSize: "3rem",
  };

  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          Shopping <span className="theC">C</span>
          <span className="theA">/\</span>rt
        </Link>
        <ul className="desktop">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/auth">{getLoggedIn ? "Dashboard" : "Login"}</Link>
          </li>
          <li>
            <Link to="/cart">Cart #{cartQuantity}</Link>
          </li>
        </ul>
        <div className="hamburger">
          <FaBars style={iconStyle} onClick={handleBurger} />
        </div>
      </nav>
      <div className="responsiveContainer">
        <ul className="responsive">
          <li>
            <Link to="/products" onClick={handleBurger}>Products</Link>
          </li>
          <li>
            <Link to="/auth" onClick={handleBurger}>{getLoggedIn ? "Dashboard" : "Login"}</Link>
          </li>
          <li>
            <Link to="/cart" onClick={handleBurger}>Cart #{cartQuantity}</Link>
          </li>
        </ul>
      </div>
    </>
  );

  function handleBurger() {
    const drop = document.querySelector(".responsiveContainer");
    drop.classList.toggle("show");
  
  }
}
