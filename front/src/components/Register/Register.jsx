import React, { useState } from "react";
import axios from "axios";
import Login from "@mui/icons-material/Login";

import {
  Avatar,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";

export const Register = () => {
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [billing_address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/register", {
        full_name,
        email,
        password,
        phone,
        billing_address,
        default_shipping_address: billing_address,
        country
      })
      .then((res) => {
        console.log("Usuario creado", res.data);
      })
      .catch((err) => console.log("Error de registro", err));
  };

  const handleChangeFullName = (e) => {
    e.preventDefault();
    setFullname(e.target.value);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleChangePhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const handleChangeAdress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleChangeCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  return (
    <Container style={{ marginTop: "5rem" }} component="main">
      <Paper
        style={{
          margin: "2em",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <Avatar style={{ alignSelf: "center" }}>
          <Login />
        </Avatar>
        <form style={{ maxWidth: "100%" }} onSubmit={handleSubmit}>
          <Typography
            variant="h4"
            align="center"
            style={{ marginBottom: "3rem" }}
          >
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={full_name}
                onChange={handleChangeFullName}
                variant="outlined"
                required
                fullWidth
                placeholder="Fullname"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={email}
                onChange={handleChangeEmail}
                variant="outlined"
                required
                fullWidth
                placeholder="Email"
                type="text"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                value={password}
                onChange={handleChangePassword}
                variant="outlined"
                required
                fullWidth
                placeholder="Password"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={phone}
                onChange={handleChangePhone}
                variant="outlined"
                required
                fullWidth
                placeholder="Phone"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={billing_address}
                onChange={handleChangeAdress}
                variant="outlined"
                required
                fullWidth
                placeholder="Address"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={country}
                onChange={handleChangeCountry}
                variant="outlined"
                required
                fullWidth
                placeholder="Country"
                type="text"
              />
            </Grid>
          </Grid>

          <Button
            style={{ marginTop: "1rem" }}
            fullWidth
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  )}