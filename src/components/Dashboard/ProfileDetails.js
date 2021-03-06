import { useEffect, useState } from "react";
import { useMyContext } from "../../Context";
import {
  useNavigate,
  Link,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ChangeAddress } from "./ChangeProfile/ChangeAddress";
import { ChangePassword } from "./ChangeProfile/ChangePasword";
import "../../styles/Profile.css";

export function ProfileDetails() {
  // Add variables using state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const [getError, setError] = useState("");

  const { logged, token, userId } = useMyContext();
  const [getLoggedIn, setLoggedIn] = logged;
  const [getToken, setToken] = token;
  const [getUserId, setUserId] = userId;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPostal, setIsOpenPostal] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);

  // For redirecting
  const navigate = useNavigate();

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
        setEmail(data.data.email);
        setPassword(data.data.password);
        setStreet(data.data.address.street);
        setPostal(data.data.address.postal);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStreet = (e) => setStreet(e.target.value);
  const handlePostal = (e) => setPostal(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordRepeat = (e) => setPasswordRepeat(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRepeat !== "" && password !== passwordRepeat) {
      setError("Passwords must match");
      navigate("/profile-details");
      return -1;
    }
    let updateData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      address: {
        street: street,
        postal: postal,
      },
    };
    fetch(
      "https://enigmatic-temple-40493.herokuapp.com/users/profile/" + getUserId,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        navigate("/auth");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="profileContainer">
      <h1 className="error">{getError}</h1>
      <h2>Profile Details</h2>
      <div className="infoContainer">
        <div>
          <div>First Name: </div>
          <div>{firstName}</div>
        </div>
        <div>
          <div>Last Name: </div>
          <div>{lastName}</div>
        </div>
        <div>
          <div>Email:</div> <div>{email}</div>
        </div>
        <div>
          <div>Password:</div>
          <div> *********</div>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpenPassword(true);
            }}
          >
            Change Password
          </button>
        </div>
        <ChangePassword
          open={isOpenPassword}
          onClose={() => {
            setIsOpenPassword(false);
          }}
          handlePassword={handlePassword}
          handlePasswordRepeat={handlePasswordRepeat}
          handleSubmit={handleSubmit}
          field="password"
        ></ChangePassword>

        <div>
          <div>Street:</div>
          <div>{street}</div>
        </div>

        <div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Change Street
          </button>
        </div>
        <ChangeAddress
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          handleChange={handleStreet}
          handleSubmit={handleSubmit}
          field="street"
        ></ChangeAddress>

        <div>
          <div>Postal Code:</div>
          <div>{postal}</div>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpenPostal(true);
            }}
          >
            Change Postal
          </button>
        </div>
        <ChangeAddress
          open={isOpenPostal}
          onClose={() => {
            setIsOpenPostal(false);
          }}
          handleChange={handlePostal}
          handleSubmit={handleSubmit}
          field="postal"
        ></ChangeAddress>
      </div>
    </div>
  );
}
