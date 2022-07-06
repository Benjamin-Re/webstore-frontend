import { Link } from "react-router-dom";
import { useMyContext } from "../Context";
import "../styles/Nav.css";
import { FaBars } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export function Nav() {
  const { cart, logged, token, cartQuantity } = useMyContext();
  const [getLoggedIn, setLoggedIn] = logged;
  const burgerStyle = {
    fontSize: "3rem",
  };
  const shoppingStyle = {
    fontSize: "1.5rem",
  };

  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-title">
          Shopping <span className="theC">C</span>
          <span className="theA">/\</span>rt
        </Link>
        <div className="rightSection">
        <ul className="desktop">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/auth">{getLoggedIn ? "Dashboard" : "Login"}</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Link to="/cart">
          <FaShoppingCart style={shoppingStyle}/>#{cartQuantity}
        </Link>
        </div>
        <div className="hamburger">
          <FaBars style={burgerStyle} onClick={handleBurger} />
        </div>
      </nav>
      <div className="responsiveContainer">
        <ul className="responsive">
          <li>
            <Link to="/products" onClick={handleBurger}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/auth" onClick={handleBurger}>
              {getLoggedIn ? "Dashboard" : "Login"}
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleBurger}>Contact</Link>
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
