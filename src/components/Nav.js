import { Link } from "react-router-dom";
import { useMyContext } from "../Context";

export function Nav() {
  const { cart, logged, token } = useMyContext();
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
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
