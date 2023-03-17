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
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [billing_address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [fullnamelError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formValid, setFormValid] = useState();

  const handleFullname = (e) => {
    e.preventDefault();
    if (!full_name || full_name.length <= 4) {
      setFullnameError(true);
      return;
    }
    setFullnameError(false);
  };

  // Email Validation
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleEmail = () => {
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (!password || password.length <= 4) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || password.length < 4) {
      setFormValid("La contraseña debe tener mas de 4 caracteres");
      return;
    }
    if (!full_name || full_name.length < 4) {
      setFormValid("Por favor ingresa tu nombre completo");
      return;
    }
    if (!phone || phone.length < 4) {
      setFormValid("Por favor ingresa tu numero completo");
      return;
    }
    if (emailError) {
      setFormValid("Por favor ingresa tu email correctamente");
      return;
    }

    axios
      .post("http://localhost:3001/users/register", {
        full_name,
        email,
        password,
        phone,
        billing_address,
        default_shipping_address: billing_address,
        country,
      })
      .then((res) => {
        setFormValid();
        navigate("/login");
      })
      .catch((err) => console.log("Error de registro", err));
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
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "3rem" }}
        >
          Registro
        </Typography>
        <form style={{ maxWidth: "100%" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={full_name}
                error={fullnamelError}
                onBlur={handleFullname}
                onChange={(e) => setFullname(e.target.value)}
                variant="outlined"
                required="true"
                fullWidth
                placeholder="Nombre Completo"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={email}
                error={emailError}
                onBlur={handleEmail}
                onChange={(e) => setEmail(e.target.value)}
                required="true"
                variant="outlined"
                fullWidth
                placeholder="Email"
                type="email"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                value={password}
                error={passwordError}
                onBlur={handlePassword}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required="true"
                fullWidth
                placeholder="Contraseña"
                type="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                variant="outlined"
                required="true"
                fullWidth
                placeholder="Teléfono"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={billing_address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                required="true"
                fullWidth
                placeholder="Dirección"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                variant="outlined"
                required="true"
                fullWidth
                placeholder="País"
                type="text"
              />
            </Grid>
          </Grid>

          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            type="submit"
            fullWidth
          >
            registrarse
          </Button>
          <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>
        </form>
      </Paper>
    </Container>
  );
};
