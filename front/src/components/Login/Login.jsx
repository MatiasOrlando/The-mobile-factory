import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Login = (user) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmiit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/login", { email, password },{withCredentials:true})
      .then((res) => {
        console.log(res.data);
        //localStorage.setItem("user", JSON.stringify(res.data));
        //setUser(res.data);
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("error login");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmiit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};