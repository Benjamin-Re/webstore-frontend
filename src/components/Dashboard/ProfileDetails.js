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
    fetch("http://localhost:8000/users/" + getUserId, {
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
    if(password !== passwordRepeat){
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
    fetch("http://localhost:8000/users/profile/" + getUserId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/auth");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>{getError}</h1>
      <div>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{email}</div>
        <div>
          *********
          <button
            onClick={() => {
              setIsOpenPassword(true);
            }}
          >
            Change Password
          </button>
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
        </div>
        <div>
          {street}
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Change Street
          </button>
          <ChangeAddress
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            handleChange={handleStreet}
            handleSubmit={handleSubmit}
            field="street"
          ></ChangeAddress>
        </div>
        <div>
          {postal}
          <button
            onClick={() => {
              setIsOpenPostal(true);
            }}
          >
            Change Postal
          </button>

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
    </>
  );
}

//     // POST the new user
//     // http://localhost:8000
//     // https://enigmatic-temple-40493.herokuapp.com
//     fetch("http://localhost:8000/users/signup", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         navigate("/auth");
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <>
//       <h2>Change details</h2>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="first_name">First Name:</label>
//         <input
//           type="text"
//           name="first_name"
//           id="first_name"

//           onChange={handleFirstName}
//         ></input>
//         <label htmlFor="last_name">Last Name</label>
//         <input

//           type="text"
//           name="last_name"
//           id="last_name"
//           onChange={handleLastName}
//         ></input>
//         <label htmlFor="email">Email</label>
//         <input

//           type="email"
//           name="email"
//           id="email"
//           onChange={handleEmail}
//         ></input>
//         <label htmlFor="password">Password</label>
//         <input

//           type="password"
//           name="password"
//           id="password"
//           onChange={handlePassword}
//         ></input>
//         <label htmlFor="street">Street</label>
//         <input

//           type="text"
//           name="street"
//           id="street"
//           onChange={handleStreet}
//         ></input>
//         <label htmlFor="postal">Postal Code</label>
//         <input

//           type="text"
//           name="postal"
//           id="postal"
//           onChange={handlePostal}
//         ></input>
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }
