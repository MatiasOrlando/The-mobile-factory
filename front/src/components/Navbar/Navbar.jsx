import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../state/user";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      localStorage.removeItem("user");
      dispatch(setUser({}));
      await axios.post(
        "http://127.0.0.1:3001/users/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useTheme();
  console.log(theme);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          {user.id ? (
            <Link to={"/carrito"}>
              <ShoppingCartIcon sx={{ transform: "scale(1.5)" }} />{" "}
            </Link>
          ) : (
            <Link to={"/login"}>
              <ShoppingCartIcon sx={{ transform: "scale(1.5)" }} />{" "}
            </Link>
          )}
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={0}
              onChange={(e, value) => setValue(value)}
            >
              <Link to={"/"}>
                <Tab href="/" label="home" />
              </Link>

              <Tab label="categories" />
              <Tab label="sale*" />
            </Tabs>

            {user.id ? (
              <>
                <Typography>{user.full_name}</Typography>
                <Button
                  onClick={() => handleClick()}
                  sx={{ marginLeft: "auto" }}
                  variant="contained"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button sx={{ marginLeft: "auto" }} variant="contained">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button sx={{ marginLeft: "10px" }} variant="contained">
                    SignUp
                  </Button>
                </Link>
              </>
            )}
          </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
