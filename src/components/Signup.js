import { useState } from "react";
import css from './Signup.css';
import { useMyContext } from "../Context";
import { useNavigate } from 'react-router-dom';

export function Signup() {
  // Add variables using state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { cart, logged, token, userId } = useMyContext();
  const [getLoggedIn, setLoggedIn] = logged;
  const [getToken, setToken] = token;
  const [getUserId, setUserId] = userId;
  
  // For redirecting
  const navigate = useNavigate();

  // Functions handling user input
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // Functions to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    console.log(newUser);

    // POST the new user
    // http://localhost:8000
    // https://enigmatic-temple-40493.herokuapp.com
    fetch("http://localhost:8000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserId(data["user"]["_id"]);
        setLoggedIn(true);
        setToken(data['accessToken']);
        navigate("/auth");
      })
      .catch((error) => console.log(error));

  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleFirstName}
        ></input>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleLastName}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleEmail}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePassword}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
