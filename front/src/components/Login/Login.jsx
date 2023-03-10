import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/user";
import { Box, Button, TextField, Typography } from "@mui/material";

export const Login = (user) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:3001/users/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        //setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(setUser(res.data));
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("error login");
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ width: "25%" }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              align="center"
              style={{ marginBottom: "3rem" }}
            >
              Login
            </Typography>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "1rem" }}
            />
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};
