import { Link } from "react-router-dom";

export function Nav() {
 
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
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
