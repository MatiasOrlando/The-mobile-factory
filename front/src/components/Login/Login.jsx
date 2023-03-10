import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/user";



export const Login = (user) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmiit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3001/users/login", { email, password }, {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        //setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(setUser(res.data))
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