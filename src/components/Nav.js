import { Link } from "react-router-dom";
import { useMyContext } from "../Context";
import "../styles/Nav.css";
import { FaBars } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export function Nav() {
  const { cart, logged, token, cartQuantity, role } = useMyContext();
  const [getLoggedIn, setLoggedIn] = logged;
  const [getRole, setRole] = role;

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
          Shopping C<span className="theA">/\</span>rt
        </Link>
        <div className="rightSection">
        <ul className="desktop">
          
          {getRole === "admin" ? <li><Link className="link" to="/admin">Admin</Link></li> : ""}
          <li>
            <Link className="link" to="/products">Products</Link>
          </li>
          <li>
            <Link className="link" to="/auth">{getLoggedIn ? "Dashboard" : "Login"}</Link>
          </li>
          <li>
            <Link className="link" to="/about">About us</Link>
          </li>
        </ul>
        <Link to="/cart">
          <FaShoppingCart style={shoppingStyle} size={28}/>#{cartQuantity}
        </Link>
        </div>
        <div className="hamburger">
          <FaBars style={burgerStyle} size={42} onClick={handleBurger} />
        </div>
      </nav>
      <div className="dropdown">
        <div className="dropdownMenu">
          <ul>
            {getRole === "admin" ? <li><Link className="link dropLink" to="/admin">Admin</Link></li> : ""}
          <li>
            <Link className="link dropLink" to="/products" onClick={handleBurger}>
              Products
            </Link>
          </li>
          <li>
            <Link className="link dropLink" to="/auth" onClick={handleBurger}>
              {getLoggedIn ? "Dashboard" : "Login"}
            </Link>
          </li>
          <li>
            <Link className="link dropLink" to="/about" onClick={handleBurger}>About us</Link>
          </li>
          </ul>
        </div>
      </div>
    </>
  );

  function handleBurger() {
    const drop = document.querySelector(".dropdownMenu");
    drop.classList.toggle("show");
  }
}
