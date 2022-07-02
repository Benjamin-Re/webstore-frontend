import { Link } from "react-router-dom";
import { useMyContext } from "../Context";
import '../styles/Nav.css';

export function Nav() {
  const { cart, logged, token, cartQuantity } = useMyContext();
  const [getLoggedIn, setLoggedIn] = logged;


  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Webshop
      </Link>
      <ul>
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
    </nav>
  );
}
