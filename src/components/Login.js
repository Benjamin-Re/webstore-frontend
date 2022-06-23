import { useState } from "react";
import { Link } from "react-router-dom";
import css from './Signup.css';

export function Login() {
  // Add variables using state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Functions handling user input
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // Functions to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let credentials = {
      email: email,
      password: password,
    };

    console.log(credentials);

    // POST the new user
    fetch("https://enigmatic-temple-40493.herokuapp.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
      <div>Not a user yet? <Link to="/signup">Signup</Link></div>
    </>
  );
}
