import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context";
import { useEffect, useState } from "react";
import "../../styles/Dashboard.css";
import { TbFileInvoice } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';

export function Dashboard() {
  const { cart, logged, token, userId, role } = useMyContext();
  const [getCart, setCart] = cart;
  const [getLoggedIn, setLoggedIn] = logged;
  const [getToken, setToken] = token;
  const [getUserId, setUserId] = userId;
  const [getRole, setRole] = role;
  const navigate = useNavigate();
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getImage, setImage] = useState();
  const nameStyle = {
    color: "orange",
    fontSize: "2rem",
  };

  useEffect(() => {
    // Fetch the current user
    fetch("https://enigmatic-temple-40493.herokuapp.com/users/" + getUserId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get user avatar
  const fetchImage = async () => {
    let initials = getFirstName[0] + getLastName[0];
    
    const res = await fetch(
      `https://avatars.dicebear.com/api/initials/${initials}.svg`
    );
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, [getFirstName]);

  return (
    <div className="dashContainer">
      <div>
        <h2>
          Welcome to your dashboard {"  "}
          <span style={nameStyle}>{getFirstName}</span>
          {getRole==="admin" ? <span>{"  "}(Admin)</span> : ""}
        </h2>
        <div className="iconLogout">
          <img src={getImage} alt="avatar"></img>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div>
        <Link to="/my-orders">
          <h3>Check your previous orders <TbFileInvoice/></h3>
        </Link>
        <Link to="/profile-details">
          <h3>Change your profile details  <CgProfile/></h3>
        </Link>
        <Link to="/products">
          <h3>Your wishlist  <AiOutlineHeart/></h3>
        </Link>
      </div>
    </div>
  );

  function handleLogout() {
    // Apart from redirect also clear login, userId, token, cart
    setCart([]);
    setLoggedIn(false);
    setToken("");
    setUserId("");
    navigate("/");
    setRole("");
  }
}
