import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context";
import { useEffect, useState } from "react";
import "../../styles/Dashboard.css";

export function Dashboard() {
  const { cart, logged, token, userId } = useMyContext();
  const [getCart, setCart] = cart;
  const [getLoggedIn, setLoggedIn] = logged;
  const [getToken, setToken] = token;
  const [getUserId, setUserId] = userId;
  const navigate = useNavigate();
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getImage, setImage] = useState();
  const nameStyle = {
    color: "orange",
    fontSize: "2rem"
  }

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
    let initials = getFirstName[0]+getLastName[0];
    console.log(initials);
    const res = await fetch(`https://avatars.dicebear.com/api/initials/${initials}.svg`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
  };

  useEffect(()=>{
    fetchImage();
  }, [getFirstName])

  return (
    <div className="dashContainer">
      <div>
        <h2>Welcome to your dashboard <span style={nameStyle}>{getFirstName}</span></h2>
        <img src={getImage} alt="avatar"></img>
      </div>
      <div>
        <Link to="/my-orders">
          <h3>Your past orders</h3>
        </Link>
        <Link to="/profile-details">
          <h3>Change profile details</h3>
        </Link>
        <button onClick={handleLogout}>
          Logout
        </button>
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
  }
}
